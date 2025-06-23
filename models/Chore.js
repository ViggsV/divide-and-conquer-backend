const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  difficulty: { type: String, required: true },
  dueDate: { type: String, required: true },
  description: { type: String, required: true },

  // link chore to a user
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Chore', choreSchema);


// assigned: { // type: Boolean, // default: true // },

