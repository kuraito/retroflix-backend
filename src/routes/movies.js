
// API ROTTE PER I FILM - RETROFLIX
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET /api/movies - Tutti i film
router.get("/", async (req, res) => {
  try {
    const filmsFromDatabase = await Movie.find({});
    res.json(filmsFromDatabase);
  } catch (error) {
    console.error('Errore rotta /:', error);
    res.status(500).json({ 
      error: 'Errore caricamento film',
      details: error.message 
    });
  }
});


// GET /api/movies/featured - Primi 3 film
router.get("/featured", async (req, res) => {
  try {
    const filmsInEvidenzaFromDB = await Movie.find({}).limit(3);
    res.json(filmsInEvidenzaFromDB);
  } catch (error) {
    console.error('Errore rotta /featured:', error);
    res.status(500).json({ 
      error: 'Errore caricamento film in evidenza',
      details: error.message 
    });
  }
});

// GET /api/movies/:id - Un singolo film
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieFromDB = await Movie.findById(movieId);
    
    if (!movieFromDB) {
      return res.status(404).json({ 
        error: 'Film non trovato',
        id: movieId 
      });
    }
    
    res.json(movieFromDB);
  } catch (error) {
    console.error(`Errore ricerca film ${req.params.id}:`, error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: 'ID film non valido'
      });
    }
    
    res.status(500).json({ 
      error: 'Errore caricamento film',
      details: error.message 
    });
  }
});

// POST /api/movies/rent/:id - Noleggia un film
router.post("/rent/:id", async (req, res) => {
  try {
    const filmId = req.params.id;
    
    // TODO: Implementare logica vera
    if (filmId === "999") {
      return res.status(404).json({ 
        message: "Film non trovato",
        id: filmId 
      });
    }
    
    const movieRented = {
      id: filmId,
      title: "Film Noleggiato",
      available: false,
      rentedAt: new Date(),
      rentedBy: "utente_123"
    };
    
    res.json({
      message: "Film noleggiato con successo",
      movie: movieRented
    });
  } catch (error) {
    console.error('Errore noleggio:', error);
    res.status(500).json({ 
      error: 'Errore durante il noleggio',
      details: error.message 
    });
  }
});

// POST /api/movies/return/:id - Restituisci un film
router.post("/return/:id", async (req, res) => {
  try {
    const filmId = req.params.id;
    
    // TODO: Implementare logica vera
    const movieReturned = {
      id: filmId,
      title: "Film Restituito",
      available: true,
      returnedAt: new Date()
    };
    
    res.json({
      message: "Film restituito con successo",
      movie: movieReturned
    });
  } catch (error) {
    console.error('Errore restituzione:', error);
    res.status(500).json({ 
      error: 'Errore durante la restituzione',
      details: error.message 
    });
  }
});

module.exports = router;
