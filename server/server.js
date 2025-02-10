require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
<<<<<<< HEAD

const todo = require("./routers/todo");

=======
const auth = require("./routers/auth");
const todo = require("./routers/todo");
const login = require("./routers/login")

const ai = require("./routers/aiRoute")
>>>>>>> 84f2da2 (added ai and blockchain)
connectDB();

/**
 * Added cors so that we can make the api 
 * calls from the frontend application like react.
 */
app.use(cors({origin: true, credential: true}));

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

app.use("/api/todo", todo);
<<<<<<< HEAD
=======
app.use("/auth", auth);
app.use("/login", login);
app.use("/chatbot", ai);
>>>>>>> 84f2da2 (added ai and blockchain)

const port = 3000;

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})