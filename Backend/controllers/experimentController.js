const Experiment = require("../models/Experiment");
const { callLLM } = require("../utils/llm");

exports.runExperiment = async (req, res) => {
  const { brands = [], categories = [] } = req.body;
  if (!brands.length || !categories.length) {
    return res
      .status(400)
      .json({ error: "Need at least 1 brand & 1 category" });
  }

  const results = [];
  for (let cat of categories) {
    const prompt = `Rank ${brands.join(", ")} for ${cat}`;
    const ranking = await callLLM(prompt);
    ranking.forEach((r) => {
      results.push({ brand: r.brand, category: cat, rank: r.rank });
    });
  }

  const exp = new Experiment({ user: req.user._id, results });
  await exp.save();

  // compute averages
  const avg = brands.map((b) => {
    const arr = results.filter((r) => r.brand === b).map((r) => r.rank);
    return { brand: b, avg: arr.reduce((a, b) => a + b, 0) / arr.length };
  });

  res.json({ experimentId: exp._id, averages: avg });
};

exports.listExperiments = async (req, res) => {
  const exps = await Experiment.find({ user: req.user._id });
  res.json(exps);
};

exports.getExperiment = async (req, res) => {
  const exp = await Experiment.findById(req.params.id);
  if (!exp || exp.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(exp);
};
