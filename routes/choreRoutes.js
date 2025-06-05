const express = require('express');
const router = express.Router();
const { getChores, addChore , updateChore, removeChore} = require('../controllers/choreController');

// Get all chores
router.get('/', getChores);

// Create new chore
router.post('/', addChore);


router.put("/:id", updateChore);

router.delete("/:id", removeChore);


module.exports = router;