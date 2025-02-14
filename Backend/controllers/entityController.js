const Entity = require('../models/entityModel');

// Get all entities
const getEntities = async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entities' });
  }
};

// Create a new entity
const createEntity = async (req, res) => {
  try {
    const newEntity = new Entity(req.body);
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error creating entity' });
  }
};

// Update an entity by ID
const updateEntity = async (req, res) => {
  try {
    const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error updating entity' });
  }
};

// Delete an entity by ID
const deleteEntity = async (req, res) => {
  try {
    await Entity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting entity' });
  }
};

module.exports = { getEntities, createEntity, updateEntity, deleteEntity };
