const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema(
  {
    brand: String,
    avg: Number,
  },
  { _id: false, strict: false }
);
const experimentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    rankings: [rankingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experiment", experimentSchema);
