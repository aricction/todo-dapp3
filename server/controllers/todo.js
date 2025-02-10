const Todo = require("../models/todo");

/**
 * The find() method will return all the todos in the collection.
 * If the collection is empty, it will return a 404 error.
 */
exports.getAllTodo = (req, res) => {
    Todo.find()
        .then((todos) => res.json(todos))
        .catch((err) => {
            res.status(404).json({ message: "TODOs not found", error: err.message });
        });
};

/**
 * The create() method will create a todo and return a success message.
 * Otherwise, it will return a 400 error.
 */
exports.postCreateTodo = (req, res) => {
    Todo.create(req.body)
        .then((data) => res.json({ message: "Todo added successfully", data }))
        .catch((error) => res.status(400).json({ message: "Failed to add todo", error: error.message }));
};

/**
 * The findByIdAndUpdate() will require two parameters: the id and data of the todo to be updated.
 * The id parameter will be extracted from req.params.id.
 */
exports.putUpdateTodo = (req, res) => {
    console.log("Updating ID:", req.params.id); // Debugging line

    console.log("Updating Todo ID:", _id);

    if (!req.params.id) {
        return res.status(400).json({ message: "ID parameter is required" });
    }

    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.json({ message: "Updated successfully", data });
        })
        .catch((error) => res.status(500).json({ message: "Failed to update", error: error.message }));
};

/**
 * The findByIdAndDelete() method will require only one parameter: the id of the todo.
 */
exports.deleteTodo = (req, res) => {
    console.log("Deleting ID:", req.params.id); // Debugging line

    if (!req.params.id) {
        return res.status(400).json({ message: "ID parameter is required" });
    }
    Todo.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.json({ message: "Todo deleted successfully", data });
        })
        .catch((err) => res.status(500).json({ message: "Failed to delete", error: err.message }));
};
