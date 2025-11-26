import React, { useState, useEffect } from 'react';
import { FiClock, FiPause, FiPlay } from 'react-icons/fi';

const Timer = ({ duration = 1800, onTimeUp, enabled = true }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }

        if (isPaused) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isPaused, enabled, onTimeUp]);

    if (!enabled) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const isWarning = timeLeft <= 300; // Last 5 minutes
    const isCritical = timeLeft <= 60; // Last 1 minute

    return (
        <div className={`flex items-center space-x-3 p-4 rounded-lg ${isCritical ? 'bg-red-100 dark:bg-red-900/30' :
                isWarning ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-primary-100 dark:bg-primary-800'
            } transition-colors duration-300`}>
            <FiClock className={`w-5 h-5 ${isCritical ? 'text-red-600' :
                    isWarning ? 'text-yellow-600' :
                        'text-primary-600 dark:text-golden-500'
                }`} />
            <span className={`text-xl font-mono font-bold ${isCritical ? 'text-red-600' :
                    isWarning ? 'text-yellow-600' :
                        'text-primary-700 dark:text-parchment-200'
                }`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 hover:bg-white/50 dark:hover:bg-primary-700 rounded transition-colors duration-200"
                aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
            >
                {isPaused ? (
                    <FiPlay className="w-4 h-4 text-primary-600 dark:text-golden-500" />
                ) : (
                    <FiPause className="w-4 h-4 text-primary-600 dark:text-golden-500" />
                )}
            </button>
        </div>
    );
};

export default Timer;
