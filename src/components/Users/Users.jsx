import { Input, message, Modal } from 'antd'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const Users = () => {
  const token = localStorage.getItem("token")
  const backend = import.meta.env.VITE_BECKEND
  const [users, setUsers] = useState([])
  const [info, setInfo] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [update, setUpdate] = useState(false)

  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    fetch(`${backend}/api/user/admin/users`, {
      method: 'GET',
      headers: {
        token: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data.users)
        setUpdate(false)
      })
  }, [update])

  const handleSet = (user) => {
    setInfo(user)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false);
    fetch(`${backend}/api/user/admin/user/delete/${info._id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setUpdate(true)
        message.success(data.msg)
      })
      .catch(err => { console.log(err) })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSetUpdate = (user) => {
    setInfo(user)
    setIsModal(true)
  }

  const handleUpdate = (e) => {
    setIsModal(false);
    const newData = {
      username: username.current.input.value,
      password: password.current.input.value,
    }

    fetch(`${backend}/api/user/admin/user/update/${info._id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(data => {
        message.success(data.msg)
        setUpdate(true)
      })
      .catch(err => { console.log(err) })
  };

  const handleUpdateCancel = () => {
    setIsModal(false);
  };

  const createdAt = (post) => {
    const data = post.split("T");
    return data[0] + " " + data[1].split(".")[0];
  };

  return (
    <div className='w-[1210px] h-[600px] bg-white rounded-lg'>
      <div className=''>
        <p className='absolute w-[14px] h-[28px] rounded-[4px] bg-[#8db9ff] left-4 top-2'></p>
        <p className='absolute text-xl left-10 top-2'>Users</p>
      </div>

      <div className='absolute top-24'>
        <ul>
          <li className='border-b-2 w-[1200px] h-8 flex mb-4 justify-around'>
            <p className='w-[150px] text-center'>Username</p>
            <p className='w-[150px] text-center'>Created At</p>
            <p className='w-[150px] text-center'>Role</p>
            <p className='w-[150px] text-center'></p>

          </li>
          {
            users?.map(user => (
              <li key={user._id} className='border-b-2 w-[1200px] h-10 flex justify-around items-center'>
                <p className='w-[150px] text-center'>{user.username}</p>
                <p className='w-[150px] text-center'>{createdAt(user.createdAt)}</p>
                <p className='w-[150px] text-center'>{user.role}</p>
                <div className='w-[150px] text-center flex justify-center items-center'>
                  <button className='w-[40px] flex justify-center' onClick={() => { handleSetUpdate(user) }}><img src="/icons/pencil.svg" alt="" /></button>
                  <button className='w-[40px] flex justify-center' onClick={() => { handleSet(user) }}><img src="/icons/delete.svg" alt="" /></button>
                </div>
              </li>
            ))
          }
        </ul>

        <Modal title="Delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Are you sure to delete:</p><p className='font-mono'>{info.username}</p>
        </Modal>

        <Modal title="Update" open={isModal} onOk={handleUpdate} onCancel={handleUpdateCancel}>
          <p>Name</p>
          <Input ref={username} placeholder={info.username} />
          <br />
          <br />
          <p>Marka</p>
          <Input ref={password} placeholder="password" />
          <br />
          <br />
        </Modal>
      </div>
    </div>
  )
}

export default Users