// routes/contacts.js
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

// router.post('/', async (req, res) => {
//     try {
//       const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  
//       // Validate required fields
//       if (!firstName || !lastName || !email) {
//         return res.status(400).json({ message: 'firstName, lastName, and email are required' });
//       }
  
      // Create a new contact document
      const newContact = new Contact({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday: new Date(birthday), // Ensure birthday is saved as a Date object
      });
  
      // Save to MongoDB
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // router.delete('/:id', async (req, res) => {
  //   try {
  //     const contact = await Contact.findByIdAndDelete(req.params.id);
  //     if (!contact) return res.status(404).json({ message: 'Contact not found' });
  //     res.json({ message: 'Contact deleted successfully' });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // });
  
  

module.exports = router;
