import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Cars from "./pages/Cars/Cars"
import Info from "./pages/Info/Info"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

const App = () => {
  const token = localStorage.getItem("token")
  return (
    <>
      <BrowserRouter>
        {/* <div className="">App</div> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/cars/:id' element={<Cars />} />
          <Route path='/cars/info/:id' element={<Info />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App