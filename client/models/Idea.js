const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  ideas: [String]
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);