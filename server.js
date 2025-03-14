const express = require('express');
const connectDB = require('./db');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define a simple route for testing
app.get('/', (req, res) => res.send('Hello World'));

// Use the contacts routes
app.use('/contacts', require('./routes/contacts'));

// Define the PORT and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
