import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
    const sizeClasses = {
        small: 'w-6 h-6 border-2',
        medium: 'w-12 h-12 border-4',
        large: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div
                className={`${sizeClasses[size]} border-primary-600 border-t-golden-500 rounded-full animate-spin`}
            ></div>
            {text && (
                <p className="text-primary-700 dark:text-parchment-200 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
};

export default Loader;
