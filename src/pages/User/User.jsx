import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const User = () => {
    const token = localStorage.getItem("token")
    const backend = import.meta.env.VITE_BECKEND
    const navigate = useNavigate()
    const [info, setInfo] = useState()

    if (!token) {
        return (
            <>
                <div className="flex flex-col items-center mt-[100px]">
                    <p className='text-3xl'>401 | Unauthorized</p>
                    <Link className='mt-6 border-2 py-1 px-3 bg-[#4096ff] text-lg text-white rounded-lg' to="/">Back to Home</Link>
                </div>
            </>
        )
    }

    useEffect(() => {
      fetch(`${backend}/api/user/info`, {
        method: 'GET',
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
        console.log(data);
        setInfo(data.user)
      })
    }, [])
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-[300px]">
                <img
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                    src="/avatar.svg"
                    alt="User Avatar"
                />
                <h1 className="text-2xl font-bold mb-2">{info ? info.username : "John Doe"}</h1>
                <p className="text-gray-600 mb-4">Customer</p>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="text-gray-800">{info ? info.email : "johndoe@example.com"}</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default User