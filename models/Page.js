const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // Who created the page
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Users who have access to the page
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Page', pageSchema);
