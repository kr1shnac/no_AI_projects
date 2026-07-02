import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware.js";
import cors from "cors";

import pool from "./db.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

const user = []
const todos = []

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = user.find(u => u.username === username)

    if(userExist) {
        return res.json("username already exist");
    }

    user.push({
        username,
        password
    })

    res.json({
        message: "user created account"
    })
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = user.find(u => u.username === username && u.password === password)

    if(!userExist) {
       return res.json("Incorrect creditionals")
    }

    const token = jwt.sign({
        username: username
    }, "krishna")

    res.json({
        token
    })
})

app.post("/todos", authMiddleware, (req, res) => {
    const username = req.username

    const todo = req.body.todo;

    todos.push({
        todo,
        username
    })

    res.json({
        message: "todo added"
    })
})

app.get("/todos", authMiddleware, (req, res) => {
    const username = req.username

    const userTodos = todos.filter(u => u.username === username);

    res.json({
        todos: userTodos
    })
})

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});