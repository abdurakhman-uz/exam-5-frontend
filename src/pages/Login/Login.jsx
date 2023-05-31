import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    if (token) navigate("/")
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const backend = import.meta.env.VITE_BECKEND



    const handleUserChange = (e) => {
        setUser(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(backend + "/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: password
            })

        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    alert(data.msg)
                } else {
                    data.token ? localStorage.setItem("token", data.token) : null
                    navigate("/")
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 ">
            <div className="bg-white rounded-lg p-8 w-[500px] shadow-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="border-gray-300 rounded-md shadow-sm w-full p-2 bg-gray-100 outline-none"
                            value={user}
                            onChange={handleUserChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border-gray-300 rounded-md shadow-sm w-full p-2 bg-gray-100 outline-none"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
