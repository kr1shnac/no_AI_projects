import { Signup } from "./screens/Signup"
import { Signin } from "./screens/Signin"
import { Todos } from "./screens/Todos"

import { Route, Routes, BrowserRouter} from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
