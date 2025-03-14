const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact by id
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new contact (all fields required)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate that all fields are provided
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' });
    }

    // Create a new contact document
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday: new Date(birthday),
    });

    // Save to MongoDB
    const savedContact = await newContact.save();
    // Return the new contact id in the response body
    res.status(201).json({ id: savedContact._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update an existing contact
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate that all fields are provided
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required for update' });
    }

    // Find and update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday: new Date(birthday),
      },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Return a 200 OK status with the updated document
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE route to delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;