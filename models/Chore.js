const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Chore', choreSchema);


// assigned: { // type: Boolean, // default: true // },