const express = require('express');
const router = express.Router();
const {
  getChores,
  addChore,
  updateChore,
  removeChore,
} = require('../controllers/choreController');
const authMiddleware = require('../middleware/authMiddleware');



// Get all chores 
router.get('/', authMiddleware, getChores);

// Add a new chore 
router.post('/', authMiddleware, addChore);

// Update a specific chore by ID
router.put('/:id', authMiddleware, updateChore);

// Delete a specific chore by ID
router.delete('/:id', authMiddleware, removeChore);

module.exports = router;
