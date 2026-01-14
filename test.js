require("dotenv").config();
const mongoose = require("mongoose");

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connessione MongoDB OK"))
  .catch(err => console.error("❌ Errore connessione:", err));
