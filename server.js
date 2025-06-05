const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.1:3000"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
