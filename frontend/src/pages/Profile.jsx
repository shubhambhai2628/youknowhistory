import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiCalendar, FiBook, FiGlobe, FiFlag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const Profile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const [statsRes, historyRes] = await Promise.all([
                api.get('/user/stats'),
                api.get('/user/history'),
            ]);
            setStats(statsRes.data);
            setHistory(historyRes.data.attempts);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="card mb-8 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-golden-500 rounded-full flex items-center justify-center text-3xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-serif font-bold mb-2">{user?.name}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-parchment-200">
                                <div className="flex items-center space-x-2">
                                    <FiMail className="w-4 h-4" />
                                    <span>{user?.email}</span>
                                </div>
                                {user?.isAdmin && (
                                    <span className="inline-block mt-2 sm:mt-0 px-3 py-1 bg-golden-500 text-white text-sm rounded-full">
                                        Admin
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Overall Statistics */}
                    <div className="card">
                        <h2 className="text-2xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-6">
                            Overall Statistics
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-parchment-100 dark:bg-primary-700 rounded-lg">
                                <span className="text-primary-600 dark:text-parchment-300">Total Attempts</span>
                                <span className="text-2xl font-bold text-primary-700 dark:text-golden-500">
                                    {stats?.totalAttempts || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-parchment-100 dark:bg-primary-700 rounded-lg">
                                <span className="text-primary-600 dark:text-parchment-300">Average Score</span>
                                <span className="text-2xl font-bold text-primary-700 dark:text-golden-500">
                                    {stats?.averageScore || 0}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-parchment-100 dark:bg-primary-700 rounded-lg">
                                <span className="text-primary-600 dark:text-parchment-300">Best Score</span>
                                <span className="text-2xl font-bold text-primary-700 dark:text-golden-500">
                                    {stats?.bestScore || 0}/100
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Category Accuracy */}
                    <div className="card">
                        <h2 className="text-2xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-6">
                            Category Accuracy
                        </h2>
                        <div className="space-y-4">
                            {[
                                { name: 'History', icon: FiBook, accuracy: stats?.categoryAccuracy?.History || 0, color: 'bg-blue-600' },
                                { name: 'Geography', icon: FiGlobe, accuracy: stats?.categoryAccuracy?.Geography || 0, color: 'bg-green-600' },
                                { name: 'Politics', icon: FiFlag, accuracy: stats?.categoryAccuracy?.Politics || 0, color: 'bg-red-600' },
                            ].map((category) => (
                                <div key={category.name}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <category.icon className="w-5 h-5 text-primary-600 dark:text-parchment-300" />
                                            <span className="font-semibold text-primary-700 dark:text-parchment-200">
                                                {category.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-golden-600">
                                            {category.accuracy}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-parchment-300 dark:bg-primary-700 rounded-full h-3">
                                        <div
                                            className={`${category.color} h-full rounded-full transition-all duration-500`}
                                            style={{ width: `${category.accuracy}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quiz History */}
                <div className="card">
                    <h2 className="text-2xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-6">
                        Quiz History
                    </h2>
                    {history.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-parchment-300 dark:border-primary-700">
                                        <th className="text-left py-3 px-4 font-semibold text-primary-700 dark:text-golden-500">
                                            Date
                                        </th>
                                        <th className="text-center py-3 px-4 font-semibold text-primary-700 dark:text-golden-500">
                                            Score
                                        </th>
                                        <th className="text-center py-3 px-4 font-semibold text-primary-700 dark:text-golden-500">
                                            Percentage
                                        </th>
                                        <th className="text-right py-3 px-4 font-semibold text-primary-700 dark:text-golden-500">
                                            Grade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((attempt) => {
                                        const grade =
                                            attempt.percentage >= 90 ? 'A+' :
                                                attempt.percentage >= 80 ? 'A' :
                                                    attempt.percentage >= 70 ? 'B' :
                                                        attempt.percentage >= 60 ? 'C' : 'D';

                                        return (
                                            <tr
                                                key={attempt.id}
                                                className="border-b border-parchment-200 dark:border-primary-700 hover:bg-parchment-100 dark:hover:bg-primary-700 transition-colors"
                                            >
                                                <td className="py-3 px-4 text-primary-600 dark:text-parchment-300">
                                                    {new Date(attempt.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </td>
                                                <td className="py-3 px-4 text-center font-semibold text-primary-700 dark:text-parchment-200">
                                                    {attempt.score}/100
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${attempt.percentage >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                                            attempt.percentage >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                                                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                        }`}>
                                                        {attempt.percentage}%
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span className="text-lg font-bold text-golden-600 dark:text-golden-500">
                                                        {grade}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-primary-500 dark:text-parchment-400">
                            <p>No quiz attempts yet. Take your first quiz to see your history!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
