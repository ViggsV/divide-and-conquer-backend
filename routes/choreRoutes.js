const express = require('express');
const router = express.Router();
const { getChores, addChore , updateChore, removeChore} = require('../controllers/choreController');
const authMiddleware = require('../middleware/authMiddleware');


// Get all chores
router.get('/', getChores);

// Create new chore
router.post('/', authMiddleware, addChore);


router.put("/:id", authMiddleware, updateChore);

router.delete("/:id", authMiddleware, removeChore);


module.exports = router;