require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔄 Tentativo di connessione a MongoDB Atlas...');
    console.log('URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connessione MongoDB riuscita!');
    
    // Test semplice
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📚 Collections disponibili:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Errore connessione:', error.message);
    console.error('📋 Dettagli completi:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnesso da MongoDB');
    process.exit(0);
  }
};

testConnection();
