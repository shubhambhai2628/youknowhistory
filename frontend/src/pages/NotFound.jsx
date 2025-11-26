import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-serif font-bold text-golden-500 mb-4">404</h1>
                <h2 className="text-3xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-4">
                    Page Not Found
                </h2>
                <p className="text-primary-600 dark:text-parchment-300 mb-8">
                    The page you're looking for doesn't exist in our history books.
                </p>
                <Link
                    to="/"
                    className="btn-primary inline-flex items-center space-x-2"
                >
                    <FiHome />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
