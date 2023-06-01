import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import css from "./Info.module.css"
import { Carousel } from 'antd';


const Info = () => {

    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const { id } = useParams()
    const backend = import.meta.env.VITE_BECKEND
    const [info, setInfo] = useState([])
    const [like, setLike] = useState(false)
    const token = localStorage.getItem("token")

    let images = info.images

    const setLikes = () => {
        setLike(!like)
        onWishlist()
    }

    const onWishlist = () => {
        fetch(`${backend}/api/user/add-wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({
                product_id: info._id,
                like: like
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const onSavat = () => {
        fetch(`${backend}/api/user/add-savat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({
                product_id: info._id,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    useEffect(() => {
        fetch(backend + `/api/cars/info/${id}`)
            .then((res) => res.json())
            .then(data => {
                setInfo(data.car[0])
            })
            .catch(err => console.log(err))
    }, [])

    // token ?
    //     useEffect(() => {
    //         fetch(backend + `/api/users/wishlists/${id}`, {
    //             headers: {
    //                 token: token
    //             }
    //         })
    //             .then((res) => res.json())
    //             .then(data => {
    //                 setInfo(data.car[0])
    //             })
    //             .catch(err => console.log(err))
    //     }, [])
    //     : ""

    return (
        <>
            {
                token ?
                    <>
                        <div className="absolute w-[120px] h-[40px] right-[40px] flex items-center justify-between">
                            <button onClick={setLikes}>
                                {
                                    like ?
                                        <img src="/icons/like.svg" alt="" />
                                        :
                                        <img src="/icons/dislike.svg" alt="" />
                                }
                            </button>
                            <button onClick={onSavat} className="right-[40px] top-[40px] px-[20px] py-[10px] rounded-xl bg-blue-500 text-white">Buy</button>
                        </div>
                    </>
                    :
                    <Link className="absolute right-[50px] top-[40px] px-[20px] py-[10px] bg-blue-500 text-white rounded-xl">Login</Link>
            }
            <div className={`${css.container} flex relative`}>
                <div>
                    <p>Bosh Sahifa / Modellar / {info.category} / {info.name}</p>
                </div>
                <div className="absolute">
                    <div className={`${css.infoSide} bg-gray-100 w-[350px] h-[570px] absolute top-[80px] rounded-md`}>
                        <div className="w-[300px]">
                            <div className="w-[200px] mt-2 ml-6">
                                <h1 className="text-xl">{info.name}</h1>
                                <p className="text-xl">{info.price} so'm</p>
                            </div>
                            <div className="w-[300px] ml-[25px] mt-2">
                                <img src={backend + "/api/cars/images/" + info.infoImage} alt="" />
                            </div>
                            <div className="text-md ml-[25px] mt-2">
                                <p>Marka: {info.marka}</p>
                                <p>Tanirovka: {info.tonirovka}</p>
                                <p>Motor: {info.motor}</p>
                                <p>Yil: {info.year}</p>
                                <p>Rangi: {info.color}</p>
                                <p>Probeg: {info.distance}</p>
                                <p>Gearbook: {info.gearbook}</p>
                                <p>Description: {info.desc}</p>
                                <p className="border-b-2 absolute bottom-[45px] w-[300px]"></p>
                                <div className="w-[300px] flex justify-end absolute bottom-[15px]">
                                    <p className="mt-2">Umumiy narx: {info.price} so'm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="relative w-[800px] ml-[500px] mt-[100px] text-center">
                            {/* <img src={backend + "/api/cars/images/" + info.image} alt="" /> */}
                            <Carousel autoplay className="">
                                {
                                    images ?
                                        images.map(img => <img src={backend + "/api/cars/images/" + img} alt="" />)
                                        :
                                        <p className="text-xl">Loading...</p>
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info