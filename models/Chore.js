const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // assigned: {
  //   type: Boolean,
  //   default: true
  // },
  completed: {
    type: Boolean,  
    default: true
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
  },
  
});

module.exports = mongoose.model('Chore', choreSchema);