import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiAward, FiMedal } from 'react-icons/fi';
import api from '../api/axios';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Leaderboard = () => {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState([]);
    const [period, setPeriod] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, [period]);

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/leaderboard?period=${period}`);
            setLeaderboard(response.data.leaderboard);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMedalIcon = (rank) => {
        if (rank === 1) return <span className="text-3xl">🥇</span>;
        if (rank === 2) return <span className="text-3xl">🥈</span>;
        if (rank === 3) return <span className="text-3xl">🥉</span>;
        return null;
    };

    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <FiTrendingUp className="w-16 h-16 text-golden-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-2">
                        Leaderboard
                    </h1>
                    <p className="text-primary-600 dark:text-parchment-300">
                        See how you rank among the best
                    </p>
                </div>

                {/* Period Selector */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg bg-parchment-200 dark:bg-primary-800 p-1">
                        {[
                            { value: '7d', label: 'Last 7 Days' },
                            { value: '30d', label: 'Last 30 Days' },
                            { value: 'all', label: 'All Time' },
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setPeriod(option.value)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${period === option.value
                                        ? 'bg-golden-500 text-white shadow-lg'
                                        : 'text-primary-600 dark:text-parchment-300 hover:bg-parchment-300 dark:hover:bg-primary-700'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="card text-center py-12">
                        <FiAward className="w-16 h-16 text-primary-400 dark:text-primary-600 mx-auto mb-4" />
                        <p className="text-primary-600 dark:text-parchment-300">
                            No scores yet for this period. Be the first!
                        </p>
                    </div>
                ) : (
                    <div className="card">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-parchment-300 dark:border-primary-700 font-semibold text-primary-700 dark:text-golden-500">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-5 sm:col-span-6">Name</div>
                            <div className="col-span-3 sm:col-span-2 text-center">Score</div>
                            <div className="col-span-3 sm:col-span-3 text-right">Date</div>
                        </div>

                        {/* Table Body */}
                        <div className="space-y-2 mt-4">
                            {leaderboard.map((entry) => {
                                const isCurrentUser = user?.name === entry.userName;
                                return (
                                    <div
                                        key={entry.rank}
                                        className={`grid grid-cols-12 gap-4 p-4 rounded-lg transition-all ${isCurrentUser
                                                ? 'bg-golden-100 dark:bg-golden-900/20 border-2 border-golden-500'
                                                : entry.rank <= 3
                                                    ? 'bg-parchment-100 dark:bg-primary-700'
                                                    : 'bg-white dark:bg-primary-800 hover:bg-parchment-50 dark:hover:bg-primary-750'
                                            }`}
                                    >
                                        <div className="col-span-1 flex items-center justify-center">
                                            {getMedalIcon(entry.rank) || (
                                                <span className="font-bold text-primary-700 dark:text-parchment-200">
                                                    #{entry.rank}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-span-5 sm:col-span-6 flex items-center">
                                            <span className={`font-semibold ${isCurrentUser
                                                    ? 'text-golden-700 dark:text-golden-400'
                                                    : 'text-primary-700 dark:text-parchment-200'
                                                }`}>
                                                {entry.userName}
                                                {isCurrentUser && (
                                                    <span className="ml-2 text-xs bg-golden-500 text-white px-2 py-1 rounded">
                                                        You
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="col-span-3 sm:col-span-2 flex flex-col items-center justify-center">
                                            <span className="text-lg font-bold text-primary-700 dark:text-golden-500">
                                                {entry.score}
                                            </span>
                                            <span className="text-xs text-primary-500 dark:text-parchment-400">
                                                {entry.percentage}%
                                            </span>
                                        </div>
                                        <div className="col-span-3 sm:col-span-3 flex items-center justify-end text-sm text-primary-600 dark:text-parchment-300">
                                            {new Date(entry.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
