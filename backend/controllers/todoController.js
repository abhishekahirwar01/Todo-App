
const Todo = require("../models/Todo");

// ✅ Get all todos for logged-in user
exports.getAll = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user }).sort({ date: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error in getting todos", error: error.message });
  }
};

// ✅ Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      date,
      completed: false,
      user: req.user, // from authMiddleware
    });
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error in creating todo", error: error.message });
  }
};

// ✅ Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user }, // only owner can update
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error in updating todo", error: error.message });
  }
};

// ✅ Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting todo", error: error.message });
  }
};

// ✅ Toggle completed (true/false)
exports.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.user });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({ message: "Todo status toggled", todo });
  } catch (error) {
    res.status(500).json({ message: "Error in toggling todo", error: error.message });
  }
};
