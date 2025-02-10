import { useState } from "react";
import axios from "axios";
import sha256 from "js-sha256"; // Import sha256
import {  API_BASE_URL  } from '../config'

export function CreateTodo({ addTaskToBlockchain }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const taskData = {
            title,
            description,
            completed: false, // New tasks start as incomplete
        };

        try {
            // Store the task in the backend
            const response = await axios.post(API_BASE_URL, taskData);
            console.log("Task created:", response.data);

            // Generate hash for blockchain storage
            const taskHash = sha256(title + description);
            console.log("Task hash:", taskHash);

            // Store the task on the blockchain
            if (addTaskToBlockchain) {
                await addTaskToBlockchain(title, taskHash);
                console.log("Task stored on blockchain");
            }

            // Clear form fields
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Failed to create task:", error.message);
        }

    }

    return (
        <section className="w-full h-[400px] max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Create Todo</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 rounded-md w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
                >
                    Add New Task
                </button>
            </form>
        </section>
    );
}
