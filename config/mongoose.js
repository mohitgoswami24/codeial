const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection

db.on('error', console.error.bind(console, "Error connecting to DB"));

db.once('open', ()=>{
    console.log('Connected to DB :: MongoDB');
});

module.exports = db;