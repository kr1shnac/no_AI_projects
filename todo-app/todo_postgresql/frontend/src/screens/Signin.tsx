import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signin () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSignin () {
        const response = await axios.post("http://localhost:3000/signin", {
            username: username,
            password: password
        })
        
        if(response.data.token) {
            localStorage.setItem("token", response.data.token)
            alert("Signin successfully")

            navigate("/todos")
        } else {
            alert(response.data.message || response.data)
        }

        
    }


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "black"}}>
        <div>
            <div >
                <input value={username} onChange = {(e) => setUsername(e.target.value)} type="text" placeholder="enter your username" style={{margin: "10px", padding: "10px", border: "1px solid black", borderRadius: "15px", width: "400px", fontSize: "30px"}} />
            </div>
            <div>
                <input value={password} onChange = {(e) => setPassword(e.target.value)} type="password" placeholder="enter your password" style={{margin: "10px", padding: "10px", border: "1px solid black", borderRadius: "15px", width: "400px", fontSize: "30px"}} />
            </div>

            <button onClick = {handleSignin} style={{margin: "10px", padding: "10px", border: "1px solid black", borderRadius: "15px", backgroundColor: "green", color: "white", fontSize: "30px"}} >Sign In</button>
        </div>
    </div>
    )
}