import React, { useState } from 'react'
import { useEffect } from 'react'

const Users = () => {
  const token = localStorage.getItem("token")
  const backend = import.meta.env.VITE_BECKEND
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetch(`${backend}/api/users/admin/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users)
        setUpdate(false)
      })
  }, [update])

  return (
    <div className='w-[1210px] h-[600px] bg-white rounded-lg'>
      Users
    </div>
  )
}

export default Users