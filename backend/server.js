const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoute");
const todoRoutes = require("./routes/todoRoute");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Connect DB
db();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// ✅ Serve frontend build correctly
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
