const Todo = require("../models/todo");
const mongoose = require("mongoose");

/**
 * Get all TODOs
 */
exports.getAllTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        if (todos.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
};

/**
 * Create a new TODO
 */
exports.postCreateTodo = async (req, res) => {
    try {
        if (!req.body || !req.body.title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const todo = await Todo.create(req.body);
        res.status(201).json({ message: "Todo added successfully", data: todo });
    } catch (error) {
        res.status(400).json({ message: "Failed to add todo", error: error.message });
    }
};

/**
 * Update a TODO by ID
 */
exports.putUpdateTodo = async (req, res) => {
    console.log("Updating ID:", req.params.id);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Updated successfully", data: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: "Failed to update", error: error.message });
    }
};

/**
 * Delete a TODO by ID
 */
exports.deleteTodo = async (req, res) => {
    console.log("Deleting ID:", req.params.id);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully", data: deletedTodo });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete", error: error.message });
    }
};
