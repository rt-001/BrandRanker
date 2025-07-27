const Experiment = require("../models/Experiment");
const { callLLM } = require("../utils/llm");
const runExperiment = async (req, res) => {
  try {
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
    const resArr = [];
    for (let i = 0; i < brands.length; i++) {
      const brand = brands[i];
      const entry = { brand };
      let total = 0;
      let count = 0;

      for (let j = 0; j < categories.length; j++) {
        const cat = categories[j];
        const match = results.find(
          (r) =>
            r.brand.toLowerCase() === brand.toLowerCase() &&
            r.category.toLowerCase() === cat.toLowerCase()
        );

        if (match) {
          entry[cat] = match.rank;
          total += match.rank;
          count++;
        } else {
          entry[cat] = null;
        }
      }

      entry.avg = count > 0 ? total / count : null;
      resArr.push(entry);
    }
    const existingExp = await Experiment.find({
      user: req.user._id,
      rankings: resArr,
    });
    if (!existingExp?.length) {
      const exp = new Experiment({ user: req.user._id, rankings: resArr });
      await exp.save();
      res.json({
        experimentId: exp._id,
        results: resArr,
        message: "Experiment completed successfully",
      });
      return;
    }
    res.json({
      experimentId: existingExp._id,
      results: resArr,
      message: "Experiment already exists",
    });
    return;
  } catch (err) {
    console.error("Error running experiment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const listExperiments = async (req, res) => {
  try {
    const exps = await Experiment.find({ user: req.user._id });
    res.json(exps);
    return;
  } catch (err) {
    console.error("Error listing experiments:", err);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

const getExperiment = async (req, res) => {
  try {
    const exp = await Experiment.findById(req.params.id);
    if (!exp || exp.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(exp);
    return;
  } catch (err) {
    console.error("Error getting experiment:", err);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

module.exports = {
  runExperiment,
  listExperiments,
  getExperiment,
};
