import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const backend = import.meta.env.VITE_BECKEND
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        fetch(backend + "/api/user/info", {
            method: "GET",
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserInfo(data.user)
            })
    }, [])


    return (
        <div className='w-[1300px] h-[60px] bg-white relative'>
            <Link className='absolute top-2 left-8 px-[20px] py-[7px] rounded-xl bg-blue-500 text-white' to="/">Asosiyga qaytish</Link>
            <img className='absolute w-[50px] h-[50px] right-[40px] top-1 border-2 rounded-full p-[2px] bg-gray-200 cursor-pointer' src={userInfo.profilePhoto ? `${backend}/api/user/profile/photo/${userInfo.profilePhoto}` : "/avatar.svg"} alt="" />
        </div>
    )
}

export default Navbar