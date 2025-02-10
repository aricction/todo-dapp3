const express = require('express');
const AIService = require('../services/aiService');

const router = express.Router();
const aiService = new AIService();

router.post('/', async (req, res) => {
    console.log("Received request body:", req.body); // Debugging output

    const { todoTitle } = req.body;
    
    if (!todoTitle) {
        return res.status(400).json({ error: "todoTitle is required" });
    }

    try {
        const enhancedTodo = await aiService.enhancedTodo(todoTitle);
        res.json({ enhancedTodo });
    } catch (error) {
        console.error("AI Enhancement Error:", error);
        res.status(500).json({ error: "Failed to enhance the task" });
    }
});

module.exports = router;
