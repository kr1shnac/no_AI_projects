import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Todos () {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    const navigate = useNavigate()

    async function addTodo() {
        const token = localStorage.getItem("token");

        const response = await axios.post("http://localhost:3000/todos", 
        {
            todo: todo
        }, {
            headers: {
            token : token
            }
        })

        setTodo("");
    }

    getTodos()

    async function getTodos() {
        const token = localStorage.getItem("token")

        if(!token) {
            navigate("/signin")
            alert("please log in")
            return
        }

        const response = await axios.get("http://localhost:3000/todos", {
            headers: {
                token: token
            }
        })

        setTodos(response.data.todos)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(!token) {
            alert("please log in")
            navigate("/signin")
        } else {
            getTodos()
        }
    }, [])

    return (
        <div style={{backgroundColor: "black", minHeight: "100vh"}}>
            <div style={{padding: "100px"}}>
                <h1 style={{color: "white", fontSize: "70px", margine: 0, paddingLeft: "15px"}}>My Todos</h1>

                <div>
                    <input value = {todo} onChange = {(e) => setTodo(e.target.value)} placeholder="add your todo" type="text" style={{margin: "10px", padding: "10px", border: "1px solid black", borderRadius: "15px", width: "400px", fontSize: "30px"}}/>
                    <button onClick = {addTodo} cursor="pointer" style={{margin: "10px", padding: "10px", border: "1px solid black", borderRadius: "15px", backgroundColor: "red", color: "white", fontSize: "30px"}}>✚</button>
                </div>
            </div>

            <div style={{marginTop: "50px", margineLeft: "50px"}}>
                {todos.map((item, index) => (
                    <div key={index} style={{color: "white", fontSize: "30px", paddingLeft: "150px"}}>
                        {item.todo}
                    </div>
                ))}
            </div>
            
        </div>
    )
}