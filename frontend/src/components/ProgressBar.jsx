import React from 'react';

const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-primary-700 dark:text-parchment-200">
                    Question {current} of {total}
                </span>
                <span className="text-sm font-semibold text-golden-600 dark:text-golden-500">
                    {Math.round(percentage)}%
                </span>
            </div>
            <div className="w-full bg-parchment-300 dark:bg-primary-700 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-golden-500 to-golden-600 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
