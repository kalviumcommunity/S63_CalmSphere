const express = require('express');
const router = express.Router();
const Entity = require('../models/entityModel'); // Ensure this path is correct!

// CREATE - Add a new entity
router.post('/', async (req, res) => {  // ✅ Base route should be `/`
  try {
    const newEntity = new Entity(req.body);
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error creating entity' });
  }
});

// READ - Get all entities
router.get('/', async (req, res) => {  // ✅ Base route should be `/`
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entities' });
  }
});

// UPDATE - Update an entity by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error updating entity' });
  }
});

// DELETE - Delete an entity by ID
router.delete('/:id', async (req, res) => {
  try {
    await Entity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting entity' });
  }
});

module.exports = router;
