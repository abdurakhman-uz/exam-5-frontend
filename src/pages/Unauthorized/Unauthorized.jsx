import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">401</h1>
                <p className="text-gray-600 mb-8">
                    Oops! You are not authorized to access this page.
                </p>
                <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;