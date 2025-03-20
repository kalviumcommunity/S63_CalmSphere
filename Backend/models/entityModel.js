const mongoose = require("mongoose");

const EntitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const Entity = mongoose.model("Entity", EntitySchema);
module.exports = Entity;
