import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // Import API base URL

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/todo/${_id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
            })
            .catch((err) => console.log("Failed to fetch task:", err.message));
    }, [_id]);

    function handleSubmit(e) {
        e.preventDefault();

        const updatedTodo = { title, description };

        axios.put(`${API_BASE_URL}/api/todo/${_id}`, updatedTodo)
            .then(() => {
                handleUpdate();
                handleClose();
            })
            .catch((err) => console.log("Failed to update task:", err.message));
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded-md"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded-md"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Update Task
            </button>
        </form>
    );
}
