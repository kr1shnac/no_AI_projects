const express = require ("express");

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
})

app.post("/signin", (req, res) => {

})

app.post("/todo", (req, res) => {

})

app.get("/todo", (req, res) => {

})

app.listen(3000);