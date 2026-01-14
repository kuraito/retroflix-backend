// ===========================================
// 🔍 CONTROLLO FILM NEL DATABASE
// ===========================================

require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');

const checkMovies = async () => {
  try {
    console.log('🔄 Connessione a MongoDB Atlas...');
    console.log('📍 URI:', process.env.MONGO_URI.replace(/:[^:@]*@/, ':***@')); // Nasconde password
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connesso con successo!');
    
    // 📊 Statistiche database
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log('🗄️ Database attivo:', dbName);
    
    // 📁 Lista collections
    const collections = await db.listCollections().toArray();
    console.log('📚 Collections trovate:', collections.map(c => c.name));
    
    // 🎬 Controllo specifico collection movies
    console.log('\n🔍 CONTROLLO COLLECTION MOVIES:');
    
    // Conta i documenti
    const movieCount = await Movie.countDocuments();
    console.log(`📊 Numero totale di film: ${movieCount}`);
    
    if (movieCount > 0) {
      // Prendi tutti i film
      const movies = await Movie.find({});
      console.log('\n🎬 FILM TROVATI:');
      movies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.year})`);
        console.log(`   ID: ${movie._id}`);
        console.log(`   Disponibile: ${movie.available || 'N/D'}`);
      });
    } else {
      console.log('❌ NESSUN FILM TROVATO nella collection movies!');
      console.log('💡 Suggerimento: Esegui "node seed.js" per caricare i film');
    }
    
  } catch (error) {
    console.error('❌ ERRORE:', error.message);
    if (error.name === 'MongoNetworkError') {
      console.log('🌐 Problema di rete - controlla la connessione internet');
    }
    if (error.name === 'MongooseError') {
      console.log('🔐 Problema di autenticazione - controlla username/password');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnesso da MongoDB');
    process.exit(0);
  }
};

checkMovies();
