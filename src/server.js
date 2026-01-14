
// SERVER BACKEND - RETROFLIX
require("dotenv").config();

// Importa librerie
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const moviesRoutes = require("./routes/movies");

// Crea app Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
app.use(express.json());

// Configurazione
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connessione database
if (MONGO_URI) {
  console.log('Connessione MongoDB...');
  connectDB(MONGO_URI)
    .then(() => {
      console.log('Database connesso');
    })
    .catch((error) => {
      console.error('Errore database:', error.message);
      process.exit(1);
    });
} else {
  console.warn('MONGO_URI non configurato');
}

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server attivo"
  });
});

// Rotte film
app.use("/api/movies", moviesRoutes);

// Avvio server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/movies`);
});
