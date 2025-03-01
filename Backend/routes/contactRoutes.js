const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Handle form submission
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Message sent!", data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

// Get all submitted messages
router.get("/contact", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
