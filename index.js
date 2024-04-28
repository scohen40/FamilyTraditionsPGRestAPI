require('colors');
const express = require('express');
const app = express();
// Configurations
require('dotenv').config({path:'./config/app.env'});
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

// Connect to the database
require('./config/db')();

// Routes
app.use('/api', require('./routes'));

// Run the server
app.listen(PORT, console.log('Server is running on http://'+HOST+':'+PORT+'...'.green));