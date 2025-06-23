const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const pageController = require("../controllers/pageController");

// Create a new page
router.post("/", authMiddleware, pageController.createPage);

// Get pages for logged-in user
router.get("/", authMiddleware, pageController.getUserPages);

router.post("/add-users", authMiddleware, pageController.addUsersToPage);


module.exports = router;
