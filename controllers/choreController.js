const Chore = require("../models/Chore");
const User = require("../models/User");

exports.getChores = async (req, res) => {

  // use the id of the user to specifically get chores linked to their account.
  try {
    const chores = await Chore.find();
    res.json(chores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addChore = async (req, res) => {
  const { id } = req.user
  const userInDB = await User.findOne({ _id: id });

  console.log(userInDB);

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const chore = new Chore({
    task: req.body.title,
    assigned: req.body.assigned,
    completed:req.body.completed,
    rating: req.body.difficulty,
    room: "Living room",
    date: req.body.dueDate,
    time: "200",
    description: req.body.description,
    // userId: userInDB._id,
  });
  console.log(chore)
  try {
    const newChore = await chore.save();
    console.log(newChore)
    res.status(201).json(newChore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Update
exports.updateChore = async (req, res) => {
  try {
    const userToken = req.headers.authorization.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInDB = await User.findOne({ token: userToken });

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const oldChore = await Chore.findById(req.params.id);
  if (!oldChore) return res.status(404).json({ message: "Chore not found"});
  if (oldChore.userId.toString() !== userInDB._id.toString()){
    return res.status(403).json({ message: "You can only update your own chores."})
  }
  
  
    const chore = await Chore.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!chore) return res.status(404).json({ message: 'Chore not found' });
    
    res.json(chore);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: err.message });
  }
 }

// Delete
exports.removeChore= async (req, res) => {
  try {
 const userToken = req.headers.authorization.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInDB = await User.findOne({ token: userToken });

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const oldChore = await Chore.findById(req.params.id);
  if (!oldChore) return res.status(404).json({ message: "Chore not found"});
  if (oldChore.userId.toString() !== userInDB._id.toString()){
    return res.status(403).json({ message: "You can only delete your own chores."})
  }
  

    const chore = await oldChore.deleteOne();
    if (!chore) return res.status(404).json({ message: 'Chore not found' });
    res.json(oldChore);
  } catch (err) {
    console.error("Error in removeChore:", err);
    res.status(400).json({ message: 'Invalid entry' });
  }
};