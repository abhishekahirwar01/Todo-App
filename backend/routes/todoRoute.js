const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAll,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");

router.get("/", authMiddleware, getAll);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.patch("/toggle/:id", authMiddleware, toggleTodo);

module.exports = router;
