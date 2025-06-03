const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  assigned: {
    type: String,
    required: true
  },
rating: {
    type: String,
    required: true
  },
  
  room: {
    type: String,
    required: true
  },
  date: {
     type: String,
     required: true
  },
  time: {
    type: String,
    require: true
  },
  imageURL: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Chore', choreSchema);