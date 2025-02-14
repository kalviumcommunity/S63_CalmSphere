const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const Entity = mongoose.model('Entity', EntitySchema);

module.exports = Entity;
