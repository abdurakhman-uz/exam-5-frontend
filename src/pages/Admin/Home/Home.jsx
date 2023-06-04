import { useEffect, useState } from "react"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import Navbar from "../../../components/Navbar/Navbar"
import Products from "../../../components/Products/Products"
import Sidebar from "../../../components/Sidebar/Sidebar"

const AdminHome = () => {
    const [render, setRender] = useState(false)
    const token = localStorage.getItem("token")
    const backend = import.meta.env.VITE_BECKEND
    const navigate = useNavigate()

    useEffect(() => {
        fetch(backend + '/api/user/admin/', {
            method: 'POST',
            headers: {
                token: token
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    navigate('/login')
                    return
                }
                return res.json()
            })
            .then(data => {
                if (data.admin) {
                    setRender(true)
                }
            })
    })

    if (render) {
        return (
            <div className=" w-[1480px] ml-auto mr-auto flex relative">
                <Sidebar />
                <Navbar />


                <div className="absolute left-[240px] top-[90px]">
                    <Outlet />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col items-center mt-[100px]">
                <p className='text-3xl'>401 | Unauthorized</p>
                <Link className='mt-6 border-2 py-1 px-3 bg-[#4096ff] text-lg text-white rounded-lg' to="/">Back to Home</Link>
            </div>
        </>
    )
}

export default AdminHome