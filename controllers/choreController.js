const Chore = require("../models/Chore");
const User = require("../models/User");

// GET 
exports.getChores = async (req, res) => {
  try {
    const { pageId } = req.query;

    if (!pageId) {
      return res.status(400).json({ message: "Missing pageId" });
    }

    const chores = await Chore.find({ pageId });
    res.json(chores);
  } catch (err) {
    console.error("Error fetching chores:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.addChore = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      completed = false,
      difficulty = 1,
      dueDate = null,
      description = "",
      pageId
    } = req.body;

    if (!title || !pageId) {
      return res.status(400).json({ message: "Title and pageId are required" });
    }

    const chore = new Chore({
      title,
      completed,
      difficulty,
      dueDate,
      description,
      pageId,
      userId,
    });

    const newChore = await chore.save();
    res.status(201).json(newChore);
  } catch (err) {
    console.error("Error adding chore:", err);
    res.status(400).json({ message: err.message });
  }
};


// PUT 
exports.updateChore = async (req, res) => {
  try {
    const userId = req.user.id;
    const chore = await Chore.findById(req.params.id);

    if (!chore) {
      return res.status(404).json({ message: "Chore not found" });
    }

    if (chore.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Chore.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE 
exports.removeChore = async (req, res) => {
  try {
    const userId = req.user.id;
    const chore = await Chore.findById(req.params.id);

    if (!chore) {
      return res.status(404).json({ message: "Chore not found" });
    }

    if (chore.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await chore.deleteOne();
    res.json({ message: "Chore deleted", chore });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(400).json({ message: err.message });
  }
};
