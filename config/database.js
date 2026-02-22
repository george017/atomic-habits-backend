const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Error connecting to database:', err.message));

module.exports = mongoose;