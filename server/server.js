require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const todo = require("./routers/todo");
const auth = require("./routers/auth");
const login = require("./routers/login")

const ai = require("./routers/aiRoute")

connectDB();

/**
 * Added cors so that we can make the api 
 * calls from the frontend application like react.
 */
app.use(
  cors({
    origin: "https://todo-dapp3-3.onrender.com", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

app.use("/login", login);
app.use("/auth", auth);
app.use("/api/todo", todo);
app.use("/chatbot", ai);


const port = 3000;

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})
