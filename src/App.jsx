import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Cars from "./pages/Cars/Cars"
import Info from "./pages/Info/Info"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import AdminHome from "./pages/Admin/Home/Home"
import Products from "./components/Products/Products"
import Users from "./components/Users/Users"
import User from "./pages/User/User"

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
          <Route path="/user/info" element={<User />} />

          {/* <Route path="/private/admin/home"  /> */}
          <Route path="/private/admin/" element={<AdminHome />}>
            <Route path="/private/admin/products" index element={<Products />} />
            <Route path="/private/admin/users" index element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App