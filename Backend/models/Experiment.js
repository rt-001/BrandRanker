const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  brand: String,
  category: String,
  rank: Number,
});

const experimentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    results: [resultSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experiment", experimentSchema);
