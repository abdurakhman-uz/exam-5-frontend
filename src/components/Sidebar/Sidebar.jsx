import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[200px] h-[100vh] bg-white'>
        <div className='relative top-10 h-[200px] flex flex-col justify-evenly items-center text-lg'>
            <Link to="/private/admin/products">Asosiy</Link>
            <Link to="/private/admin/users">Users</Link>
            <Link to="#">E'lonlar</Link>
            <Link to="#">Savollar</Link>
        </div>
    </div>
  )
}

export default Sidebar