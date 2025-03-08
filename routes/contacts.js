const express = require('express');
const router = express.Router();
// For now, we’re not using a model – later you can define a Contact model.

// GET ALL contacts – This should query your MongoDB collection "contacts"
router.get('/', async (req, res) => {
  try {
    // Here, you’d query the database. For now, we’ll simulate with a dummy array.
    const contacts = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', favoriteColor: 'blue', birthday: '1990-01-01' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', favoriteColor: 'red', birthday: '1992-02-02' }
    ];
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact by id from query parameter
router.get('/:id', async (req, res) => {
  try {
    // Replace this dummy lookup with a MongoDB query later.
    const id = req.params.id;
    const contact = { id, firstName: 'John', lastName: 'Doe', email: 'john@example.com', favoriteColor: 'blue', birthday: '1990-01-01' };
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
