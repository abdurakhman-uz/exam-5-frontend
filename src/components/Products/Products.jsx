import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Modal, Select, Upload, message } from 'antd';
const { TextArea } = Input;

const Products = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [cars, setCars] = useState([]);
    const [info, setInfo] = useState([]);
    const [cover, setCover] = useState("");
    const [images, setImages] = useState("");
    const [infoImage, setInfoImage] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryImage, setCategoryImage] = useState("")
    const [addCars, setAddCars] = useState(false)
    const [update, setUpdate] = useState(false);
    const token = localStorage.getItem("token")
    const backend = import.meta.env.VITE_BECKEND

    let category = ""
    const name = useRef(null);
    const marka = useRef(null);
    const tanirovka = useRef(null);
    const motor = useRef(null);
    const gearbook = useRef(null);
    const year = useRef(null);
    const color = useRef(null);
    const distance = useRef(null);
    const price = useRef(null);
    const desc = useRef(null);

    const props = {
        name: 'file',
        action: `${backend}/api/models/image/create`,
        headers: {
            token: token,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setCategoryImage(info.file.response.file)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            console.log(info.file.response);

        },
    };

    const coverImage = {
        name: 'file',
        action: `${backend}/api/cars/create/coverImage`,
        headers: {
            token: token,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setCover(info.file.response.file)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            console.log(info.file.response);

        },
    };

    const infoImageUpload = {
        name: 'file',
        action: `${backend}/api/cars/create/infoImage`,
        headers: {
            token: token,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setInfoImage(info.file.response.file)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            console.log(info.file.response);

        },
    };

    const ImagesUpload = {
        name: 'file',
        action: `${backend}/api/cars/create/images`,
        headers: {
            token: token,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {

                setImages(info.file.response.msg)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            console.log(info.file.response);

        },
    };

    var files = [];


    // const handleFileChange = ({ fileList, onSuccess, onError }) => {
    //     const formData = new FormData();
    //     formData.append('file', fileList.fileList);

    //     fetch(`${backend}/api/cars/create/images`, {
    //         method: 'POST',
    //         headers: {
    //             token: token,
    //         },
    //         body: files,
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // Perform any success handling here
    //             if (data.err) {
    //                 return onError()
    //             }

    //             console.log('Upload success:', data);
    //             onSuccess();
    //         })
    //         .catch(error => {
    //             // Perform any error handling here
    //             console.error('Upload error:', error);
    //             onError(error);
    //         });

    // };

    const handleFileChange = ({ file, onSuccess }) => {
        // Create a new FormData object
        const formData = new FormData();
        
        // Append the file to the FormData object as an array
        formData.append('file', file);
    
        // Make your custom request to the server
        // Replace the URL and method with your own endpoint
        fetch(`${backend}/api/cars/create/images`, {
          method: 'POST',
          headers: {
            token: token
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Perform any success handling here
            console.log('Upload success:', data);
            onSuccess();
          })
          .catch((error) => {
            // Perform any error handling here
            console.error('Upload error:', error);
            onSuccess(error);
          });
      };

    const handleCustomRequest = ({ file, data, fileList, onSuccess, onError, onProgress }) => {
        console.log(data);


        // fetch(`${backend}/api/cars/create/images`, {
        //     method: 'POST',
        //     headers: {
        //         token: token,
        //     },
        //     body: files,
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // Perform any success handling here
        //         if (data.err) {
        //             return onError()
        //         }

        //         console.log('Upload success:', data);
        //         onSuccess();
        //     })
        //     .catch(error => {
        //         // Perform any error handling here
        //         console.error('Upload error:', error);
        //         onError(error);
        //     });

        // setTimeout(() => {
        //     onSuccess();
        // }, 5000);
    };

    useEffect(() => {
        fetch(`${backend}/api/cars/`)
            .then(res => res.json())
            .then(data => {
                setCars(data.cars)
                setUpdate(false)
            })
    }, [update])

    useEffect(() => {
        fetch(`${backend}/api/models`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.models)
            })
    }, [update])

    const openCategoryModal = (product) => {
        setCategoryModal(true)
    }

    const categorySubmit = () => {
        setCategoryModal(false)

        const newData = {
            name: name.current.input.value,
            img: categoryImage
        }

        fetch(`${backend}/api/models/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    return message.success(data.msg)
                }
                message.error(data.msg)
            })
    }

    const categoryCancel = () => {
        setCategoryModal(false)
    }

    const handleSet = (product) => {
        setInfo(product)
        setIsModalOpen(true)
    }

    const handleSetUpdate = (product) => {
        setInfo(product)
        setIsModal(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
        fetch(`${backend}/api/cars/delete/${info._id}`, {
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

    const handleUpdate = (e) => {
        setIsModal(false);
        const newData = {
            name: name.current.input.value,
            marka: marka.current.input.value,
            tonirovka: tanirovka.current.input.value,
            motor: motor.current.input.value,
            gearbook: gearbook.current.input.value,
            year: year.current.input.value,
            color: color.current.input.value,
            distance: distance.current.input.value,
            price: price.current.input.value,
            desc: desc.current.resizableTextArea.textArea.value,
        }

        fetch(`${backend}/api/cars/update/${info._id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                setUpdate(true)
            })
            .catch(err => { console.log(err) })
    };

    const handleUpdateCancel = () => {
        setIsModal(false);
    };

    const handleModalCars = () => {
        setAddCars(true)
    }

    const handleCategoryChange = (value) => {
        category = value
    }

    const handleAddCars = () => {
        setAddCars(false)
        const newData = {
            category: category,
            name: name.current.input.value,
            marka: marka.current.input.value,
            tonirovka: tanirovka.current.input.value,
            motor: motor.current.input.value,
            gearbook: gearbook.current.input.value,
            year: year.current.input.value,
            color: color.current.input.value,
            distance: distance.current.input.value,
            price: price.current.input.value,
            desc: desc.current.resizableTextArea.textArea.value,
            cover: cover,
            images: images,
            infoImage: infoImage
        }

        console.log(newData);

        fetch(`${backend}/api/cars/create`, {
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
    }

    const handleCarsCancel = () => {
        setAddCars(false)
    }

    var options = []

    categories.map(data => options.push({
        value: data.name,
        label: data.name
    }))

    return (
        <div className='w-[1210px] h-[600px] bg-white rounded-lg relative'>
            <div className=''>
                <p className='absolute w-[14px] h-[28px] rounded-[4px] bg-[#FFD88D] left-4 top-2'></p>
                <p className='absolute text-xl left-10 top-2'>Mashinalar</p>
            </div>

            <div className='text-white'>
                <button onClick={() => openCategoryModal()} className='absolute right-64 top-2 px-[20px] py-[7px] rounded-xl bg-blue-500'>
                    + Kategoriya qoshish
                </button>
                <button onClick={() => handleModalCars()} className='absolute right-14 top-2 px-[20px] py-[7px] rounded-xl bg-blue-500'>
                    + Mashina qoshish
                </button>
            </div>

            <div className='absolute top-24'>
                <ul>
                    <li className='border-b-2 w-[1200px] h-8 flex mb-4 justify-around'>
                        <p className='w-[150px] text-center'>Markasi</p>
                        <p className='w-[150px] text-center'>Gearbook</p>
                        <p className='w-[150px] text-center'>Tanirovka</p>
                        <p className='w-[150px] text-center'>Motor</p>
                        <p className='w-[150px] text-center'>Year</p>
                        <p className='w-[150px] text-center'>Color</p>
                        <p className='w-[150px] text-center'>Distence</p>
                        <p className='w-[150px] text-center'></p>

                    </li>
                    {
                        cars?.map(product => (
                            <li key={product.id} className='border-b-2 w-[1200px] h-10 flex justify-around items-center'>
                                <p className='w-[150px] text-center'>{product.name}</p>
                                <p className='w-[150px] text-center'>{product.gearbook}</p>
                                <p className='w-[150px] text-center'>{product.tonirovka}</p>
                                <p className='w-[150px] text-center'>{product.motor}</p>
                                <p className='w-[150px] text-center'>{product.year}</p>
                                <p className='w-[150px] text-center'>{product.color}</p>
                                <p className='w-[150px] text-center'>{product.distance}</p>
                                <div className='w-[150px] text-center flex justify-center items-center'>
                                    <button className='w-[40px] flex justify-center' onClick={() => { handleSetUpdate(product) }}><img src="/icons/pencil.svg" alt="" /></button>
                                    <button className='w-[40px] flex justify-center' onClick={() => { handleSet(product) }}><img src="/icons/delete.svg" alt="" /></button>
                                </div>
                            </li>
                        ))
                    }
                </ul>

            </div>

            <Modal title="Add Category" open={categoryModal} onOk={categorySubmit} onCancel={categoryCancel}>
                <p>Name</p>
                <Input ref={name} placeholder="Name" />
                <br />
                <br />
                <Upload {...props}>
                    <Button >Click to Upload</Button>
                </Upload>
            </Modal>

            <Modal title="Add Car" open={addCars} onOk={handleAddCars} onCancel={handleCarsCancel}>
                <p>Category</p>
                <Select
                    style={{
                        width: 470,
                    }}
                    onChange={handleCategoryChange}
                    options={options}
                />
                <br />
                <br />
                <p>Name</p>
                <Input ref={name} placeholder="Name" />
                <br />
                <br />
                <p>Marka</p>
                <Input ref={marka} placeholder="Marka" />
                <br />
                <br />
                <p>Tanirovka</p>
                <Input ref={tanirovka} placeholder="Tanirovka" />
                <br />
                <br />
                <p>Motor</p>
                <Input ref={motor} placeholder="Motor" />
                <br />
                <br />
                <p>Gearbook</p>
                <Input ref={gearbook} placeholder="Gearbook" />
                <br />
                <br />
                <p>Year</p>
                <Input ref={year} placeholder="Year" />
                <br />
                <br />
                <p>Color</p>
                <Input ref={color} placeholder="Color" />
                <br />
                <br />
                <p>Distance</p>
                <Input ref={distance} placeholder="Distance" />
                <br />
                <br />
                <p>Price</p>
                <Input ref={price} placeholder="Price" />
                <br />
                <br />
                <p>Desc</p>
                <TextArea ref={desc} rows={4} placeholder="Description" />
                <br />
                <br />
                <p>Cover Image</p>
                <Upload {...coverImage}>
                    <Button >Click to Upload</Button>
                </Upload>
                <br />
                <br />
                <p>Info Image</p>
                <Upload {...infoImageUpload}>
                    <Button >Click to Upload</Button>
                </Upload>
                <br />
                <br />
                <p>Carousel Images</p>
                <Upload multiple onChange={handleFileChange} customRequest={handleCustomRequest}>
                    <Button >Click to Upload</Button>
                </Upload>
            </Modal>

            <Modal title="Delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {
                    info.name
                }
            </Modal>

            <Modal title="Update" open={isModal} onOk={handleUpdate} onCancel={handleUpdateCancel}>
                <p>Name</p>
                <Input ref={name} placeholder={info.name} />
                <br />
                <br />
                <p>Marka</p>
                <Input ref={marka} placeholder={info.marka} />
                <br />
                <br />
                <p>Tanirovka</p>
                <Input ref={tanirovka} placeholder={info.tonirovka} />
                <br />
                <br />
                <p>Motor</p>
                <Input ref={motor} placeholder={info.motor} />
                <br />
                <br />
                <p>Gearbook</p>
                <Input ref={gearbook} placeholder={info.gearbook} />
                <br />
                <br />
                <p>Year</p>
                <Input ref={year} placeholder={info.year} />
                <br />
                <br />
                <p>Color</p>
                <Input ref={color} placeholder={info.color} />
                <br />
                <br />
                <p>Distance</p>
                <Input ref={distance} placeholder={info.distance} />
                <br />
                <br />
                <p>Price</p>
                <Input ref={price} placeholder={info.price} />
                <br />
                <br />
                <p>Desc</p>
                <TextArea ref={desc} rows={4} placeholder={info.desc} />
            </Modal>
        </div>
    )
}

export default Products