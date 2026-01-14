
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number },
  poster: { type: String },
  description: { type: String },
  rentedCount: { type: Number, default: 0 },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Movie", movieSchema);