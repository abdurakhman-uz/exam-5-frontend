import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasketPage = () => {
    const token = localStorage.getItem("token")
    const backend = import.meta.env.VITE_BECKEND
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(backend + '/api/user/savat/', {
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
                setData(data.msg)
            })
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white py-4 px-8 shadow">
                <h1 className="text-2xl font-bold text-gray-800">Basket</h1>
            </header>

            <main className="flex-1 p-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Items in Your Basket</h2>
                    <ul>
                        {
                            data[0] ?
                                data?.map(data => (
                                    <li key={data._id} className="w-[100%] flex justify-around">
                                        <p>{data.name}</p>
                                        <p>{data.gearbook}</p>
                                        <p>{data.motor}</p>
                                        <p>{data.distance}</p>
                                        <p>{data.year}</p>
                                        <p>{data.price}</p>
                                    </li>
                                ))
                                :
                                <>
                                    <h1>Nothing Found</h1>
                                </>
                        }
                    </ul>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Summary</h2>
                        <p>TOTAL: {data.reduce((a, b) => a + parseInt(b.price), 0)}$</p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </main>

            <footer className="bg-white py-4 px-8 shadow text-center">
                <p className="text-gray-600">© {new Date().getFullYear()} My Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BasketPage;
