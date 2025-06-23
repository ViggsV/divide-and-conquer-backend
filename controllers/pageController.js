const Page = require("../models/Page");
const User = require("../models/User");

// Create a new page and invite users by email
exports.createPage = async (req, res) => {
  try {
    const { name, invitedEmails = [] } = req.body;
    const creatorId = req.user.id;

    const invitedUsers = await User.find({ email: { $in: invitedEmails } });

    const userIds = new Set([
      creatorId,
      ...invitedUsers.map(user => user._id.toString())
    ]);

    const newPage = new Page({
      name,
      createdBy: creatorId,
      users: Array.from(userIds)
    });

    await newPage.save();
    res.status(201).json({ message: "Page created successfully", page: newPage });
  } catch (err) {
    console.error("Error creating page:", err);
    res.status(500).json({ message: "Failed to create page", error: err.message });
  }
};

exports.getUserPages = async (req, res) => {
  try {
    const userId = req.user.id;
    const pages = await Page.find({ users: userId });
    res.json(pages);
  } catch (err) {
    console.error("Error fetching pages:", err);
    res.status(500).json({ message: "Failed to fetch pages", error: err.message });
  }
};

// Add users to an existing page (inviting them)
exports.addUsersToPage = async (req, res) => {
  try {
    const { pageId, invitedEmails = [] } = req.body;
    const requesterId = req.user.id;

    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    if (!page.users.map(id => id.toString()).includes(requesterId)) {
      return res.status(403).json({ message: "You are not authorized to invite users to this page" });
    }

    const invitedUsers = await User.find({ email: { $in: invitedEmails } });

    const currentUserIds = page.users.map(id => id.toString());
    invitedUsers.forEach(user => {
      if (!currentUserIds.includes(user._id.toString())) {
        page.users.push(user._id);
      }
    });

    await page.save();
    res.json({ message: "Users added successfully", page });
  } catch (err) {
    console.error("Error adding users to page:", err);
    res.status(500).json({ message: "Failed to add users to page", error: err.message });
  }
};
