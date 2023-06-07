import { Button, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'

const Model = () => {
    const backend = import.meta.env.VITE_BECKEND
    const [models, setModels] = useState([])
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [update, setUpdate] = useState([])
    const [id, setId] = useState([])

    const handleSetDelete = (id) => {
        id(id)
        deleteModal(true)
    }

    const handleDelete = () => {
        fetch(`${backend}/api/models/delete/${info._id}`, {
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
                setIsModalOpen(false);
            })
            .catch(err => { console.log(err) })
    };

    const handleDeleteCancel = () => {
        setDeleteModal(false);
    };

    const handleSetUpdate = (id) => {
        id(id)
        setUpdateModal(true)
    }

    const handleUpdate = () => {
        fetch(`${backend}/api/models/delete/${info._id}`, {
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
                setUpdateModal(false);
            })
            .catch(err => { console.log(err) })
    };

    const handleUpdateCancel = () => {
        setUpdateModal(false);
    };

    useEffect(() => {
        fetch(`${backend}/api/models`)
            .then(res => res.json())
            .then(data => {
                setModels(data.models);
            })

    }, [update])


    return (
        <div className='w-[1210px] h-[600px] bg-white rounded-lg'>
            <div className=''>
                <p className='absolute w-[14px] h-[28px] rounded-[4px] bg-[#ffb38d] left-4 top-2'></p>
                <p className='absolute text-xl left-10 top-2'>Models</p>
            </div>

            <div className='absolute top-24'>
                <ul>
                    <li className='border-b-2 w-[1200px] h-8 flex mb-4 justify-around'>
                        <p className='w-[150px] text-center'>Model</p>
                        <p className='w-[150px] text-center'></p>

                    </li>
                    {
                        models?.map(model => (
                            <li key={model._id} className='border-b-2 w-[1200px] h-10 flex justify-around items-center'>
                                <p className='w-[150px] text-center'>{model.name}</p>
                                <div className='w-[150px] text-center flex justify-center items-center'>
                                    <button className='w-[40px] flex justify-center'><img src="/icons/pencil.svg" alt="" /></button>
                                    <button className='w-[40px] flex justify-center'><img src="/icons/delete.svg" alt="" /></button>
                                </div>
                            </li>
                        ))
                    }

                    {/* <li className='border-b-2 w-[1200px] h-10 flex justify-around items-center'>
                        <p className='w-[150px] text-center'>OKOKOOKKOKOK</p>
                        <div className='w-[150px] text-center flex justify-center items-center'>
                            <button className='w-[40px] flex justify-center' onClick={""}><img src="/icons/pencil.svg" alt="" /></button>
                            <button className='w-[40px] flex justify-center' onClick={""}><img src="/icons/delete.svg" alt="" /></button>
                        </div>
                    </li> */}
                </ul>

            </div>
        </div >
    )
}

export default Model