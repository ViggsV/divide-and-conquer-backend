const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  assigned: {
    type: boolean,
    default: true
  },
  completed: {
    type: Boolean,  
    default: false
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

  description: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model('Chore', choreSchema);