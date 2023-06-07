import { Button, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

const Model = () => {
    const backend = import.meta.env.VITE_BECKEND
    const token = localStorage.getItem("token")
    const [models, setModels] = useState([])
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [update, setUpdate] = useState([])
    const [info, setInfo] = useState([])

    const name = useRef(null)

    const handleSetDelete = (data) => {
        setInfo(data)
        setDeleteModal(true)
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
                setDeleteModal(false);
            })
            .catch(err => { console.log(err) })
    };

    const handleDeleteCancel = () => {
        setDeleteModal(false);
    };

    const handleSetUpdate = (data) => {
        setInfo(data)
        setUpdateModal(true)
    }

    const handleUpdate = () => {

        let data = {
            name: name.current.input.value
        }

        fetch(`${backend}/api/models/update/${info._id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify(data)
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
                                    <button className='w-[40px] flex justify-center' onClick={() => handleSetUpdate(model)}><img src="/icons/pencil.svg" alt="" /></button>
                                    <button className='w-[40px] flex justify-center' onClick={() => handleSetDelete(model)}><img src="/icons/delete.svg" alt="" /></button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <Modal
                    title=""
                    open={deleteModal}
                    onCancel={handleDeleteCancel}
                    footer={[
                        <Button
                            key="back"
                            onClick={handleDeleteCancel}>
                            Exit
                        </Button>,
                        <Button
                            key="submit"
                            className=''
                            onClick={handleDelete}>
                            Delete
                        </Button>,
                    ]}
                >
                    <div className='relative mb-4'>
                        <p className='absolute w-[14px] h-[28px] rounded-[4px] bg-[#ff8d8d] '></p>
                        <p className='ml-6 text-xl'>User Delete</p>
                    </div>
                    <p>Are you sure to delete:</p><p className='font-mono'>{info.name}</p>
                </Modal>

                <Modal
                    title=""
                    open={updateModal}
                    onCancel={handleUpdateCancel}
                    footer={[
                        <Button
                            key="back"
                            onClick={handleUpdateCancel}>
                            Exit
                        </Button>,
                        <Button
                            key="submit"
                            className=''
                            onClick={handleUpdate}>
                            Update
                        </Button>,
                    ]}
                >
                    <div className='relative mb-4'>
                        <p className='absolute w-[14px] h-[28px] rounded-[4px] bg-[#ff8d8d] '></p>
                        <p className='ml-6 text-xl'>Update</p>
                    </div>
                    <div>
                        <p>Name</p>
                        <Input ref={name} placeholder="Name" />
                    </div>
                </Modal>
            </div>
        </div >
    )
}

export default Model