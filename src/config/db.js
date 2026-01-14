
const mongoose = require("mongoose");

// Connessione database MongoDB
async function connectDB(uri) {
  if (!uri) throw new Error("URI non definito");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
}

module.exports = { connectDB };
