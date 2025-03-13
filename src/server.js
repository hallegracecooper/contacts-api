// server.js
const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.get('/', (req, res) => res.send('Hello World'));

// Use the contacts routes
app.use('/contacts', require('./routes/contacts'));

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
