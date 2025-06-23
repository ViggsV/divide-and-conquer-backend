const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  difficulty: { type: Number, default: 1 }, 
  dueDate: { type: String, default: "" },
  description: { type: String, default: "" },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true,
  },

  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Chore', choreSchema);
