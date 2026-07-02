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

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await pool.query(`
            SELECT * FROM users WHERE username = $1
        `, [username])

    if(userExist.rows.length > 0) {
        return res.json("username already exist");
    }

    await pool.query(`
            INSERT INTO users (username, password) VALUES ($1, $2)
        `, [username, password])

    res.json({
        message: "user created account"
    })
})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await pool.query(`
            SELECT * FROM users WHERE username = $1 AND password = $2
        `, [username, password])

    if(userExist.rows.length === 0) {
       return res.json("Incorrect creditionals")
    }

    const token = jwt.sign({
        username: username
    }, "krishna")

    res.json({
        token
    })
})

app.post("/todos", authMiddleware, async (req, res) => {
    const username = req.username
    const todo = req.body.todo;

    const userResults = await pool.query(`
            SELECT id FROM users WHERE username = $1
        `, [username])

    const userId = userResults.rows[0].id;

    await pool.query(`
            INSERT INTO todos (todo, user_id) VALUES ($1, $2)
        `, [todo, userId])

    res.json({
        message: "todo added"
    })
})

app.get("/todos", authMiddleware, async (req, res) => {
    const username = req.username

    const userResults = await pool.query(`
            SELECT id FROM users WHERE username = $1
        `, [username])

    const userId = userResults.rows[0].id;

    const userTodos = await pool.query(`
            SELECT id, todo FROM todos WHERE user_id = $1 ORDER BY id DESC
        `, [userId])

    res.json({
        todos: userTodos.rows
    })
})

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});