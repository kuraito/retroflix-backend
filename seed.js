require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./src/models/Movie");

async function seed() {
  try {
    console.log("🔹 Connessione a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connesso a MongoDB");

    // I tuoi mockMovies
    const movies = [
      {
        title: "Matrix",
        year: 1999,
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        description: "Un programmatore scopre che la realtà come la conosce è solo una simulazione controllata da macchine senzienti."
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        description: "Le vite di due sicari, un pugile, un gangster e sua moglie si intrecciano in quattro storie di violenza e redenzione."
      },
      {
        title: "Donnie Darko",
        year: 2001,
        poster: "https://m.media-amazon.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        description: "Un adolescente turbato riceve visite da un coniglio gigante che lo manipola per commettere una serie di crimini."
      },
      {
        title: "The Truman Show",
        year: 1998,
        poster: "https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
        description: "Un uomo vive inconsapevolmente in un reality show televisivo che documenta la sua intera vita."
      },
      {
        title: "Blade Runner",
        year: 1982,
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        description: "In un futuro distopico, un cacciatore di replicanti deve rintracciare e eliminare quattro androidi fuggiaschi."
      },
      {
        title: "Ghostbusters",
        year: 1984,
        poster: "https://m.media-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_SX300.jpg",
        description: "Tre scienziati aprono un'attività di caccia ai fantasmi a New York City."
      },
      {
        title: "Jurassic Park",
        year: 1993,
        poster: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg",
        description: "Un parco tematico popolato da dinosauri clonati diventa un incubo quando le creature sfuggono al controllo."
      },
      {
        title: "Top Gun",
        year: 1986,
        poster: "https://m.media-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
        description: "Un giovane pilota di caccia navale compete con i migliori piloti nella scuola di volo d'élite della Marina."
      },
      {
        title: "Forrest Gump",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        description: "Le straordinarie avventure di un uomo dal cuore puro attraverso alcuni dei momenti più significativi del 20° secolo."
      }
    ];

    console.log("🔹 Pulisco collection esistente...");
    await Movie.deleteMany();

    console.log("🔹 Inserisco film...");
    const result = await Movie.insertMany(movies);
    console.log(`✅ Inseriti ${result.length} film:`);

    result.forEach(movie =>
      console.log(`- ${movie.title} (${movie.year})`)
    );

    process.exit();
  } catch (err) {
    console.error("❌ Errore:", err);
    process.exit(1);
  }
}

seed();



/**
 * serve per popolare il database.
 * Dotenv prende le variabili d'ambiente
 * mongoose, connessione diretta a mongodb
 * Movie, modello dei film
 * 
 * Poi c'è la funzione di Seeding
 * Si collega direttamente a MongoDB usando l'URI
 * con    await mongoose.connect(process.env.MONGO_URI);
 * 
 * movies sono i film di esempio
 * 
 * Pulisce la collezione esistente con Movie.deleteMany();
 * 
 * Inserisce i film con Movie.insertMany(movies);
 *
 * poi con result.forEach(movie => console.log(`- ${movie.title} (${movie.year})`));
 * stampa i film inseriti
 * 
 * process.exit() termina il processo
 * 
 * seed() avvia la funzione di seeding
 *  
 * */