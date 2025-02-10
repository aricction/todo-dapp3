const express = require('express');
const router = express.Router();
const {chatWithGPT} = require("../models/gptModel");


router.post("/", async(req, res)=>{
    const { message } = req.body;

    if(!message){
        return res.status(400).json({error: "message is required"});
    }

    try{
        const response = await chatWithGPT(message);
        res.json({ response });
    } catch (error){
        console.log("error generation response", error);
        res.status(500).json({ error : " failed to generate response "});
    }
});

module.exports = router;