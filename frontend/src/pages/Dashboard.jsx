import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiTrendingUp, FiAward, FiBook, FiGlobe, FiFlag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [recentAttempts, setRecentAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, attemptsRes] = await Promise.all([
                api.get('/user/stats'),
                api.get('/user/history'),
            ]);
            setStats(statsRes.data);
            setRecentAttempts(attemptsRes.data.attempts.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-2">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-primary-600 dark:text-parchment-300">
                        Ready to test your knowledge today?
                    </p>
                </div>

                {/* Start Quiz CTA */}
                <div className="card bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 mb-8 animate-slide-up">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">
                                Begin Your Quiz Journey
                            </h2>
                            <p className="text-parchment-100">
                                25 Questions • Mix of History, Geography & Politics • 100 Marks
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/quiz')}
                            className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 group"
                        >
                            <FiPlay className="w-5 h-5" />
                            <span>Start Quiz</span>
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    {/* Stats Cards */}
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-primary-600 dark:text-parchment-300 mb-1">
                                    Total Attempts
                                </p>
                                <p className="text-3xl font-bold text-primary-700 dark:text-golden-500">
                                    {stats?.totalAttempts || 0}
                                </p>
                            </div>
                            <FiBook className="w-12 h-12 text-golden-500" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-primary-600 dark:text-parchment-300 mb-1">
                                    Average Score
                                </p>
                                <p className="text-3xl font-bold text-primary-700 dark:text-golden-500">
                                    {stats?.averageScore || 0}%
                                </p>
                            </div>
                            <FiTrendingUp className="w-12 h-12 text-golden-500" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-primary-600 dark:text-parchment-300 mb-1">
                                    Best Score
                                </p>
                                <p className="text-3xl font-bold text-primary-700 dark:text-golden-500">
                                    {stats?.bestScore || 0}
                                </p>
                            </div>
                            <FiAward className="w-12 h-12 text-golden-500" />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Category Accuracy */}
                    <div className="card">
                        <h3 className="text-xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-4">
                            Category Accuracy
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'History', icon: FiBook, accuracy: stats?.categoryAccuracy?.History || 0, color: 'blue' },
                                { name: 'Geography', icon: FiGlobe, accuracy: stats?.categoryAccuracy?.Geography || 0, color: 'green' },
                                { name: 'Politics', icon: FiFlag, accuracy: stats?.categoryAccuracy?.Politics || 0, color: 'red' },
                            ].map((category) => (
                                <div key={category.name}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                                            <span className="font-semibold text-primary-700 dark:text-parchment-200">
                                                {category.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-golden-600">
                                            {category.accuracy}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-parchment-300 dark:bg-primary-700 rounded-full h-2">
                                        <div
                                            className={`bg-${category.color}-600 h-full rounded-full transition-all duration-500`}
                                            style={{ width: `${category.accuracy}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Attempts */}
                    <div className="card">
                        <h3 className="text-xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-4">
                            Recent Attempts
                        </h3>
                        {recentAttempts.length > 0 ? (
                            <div className="space-y-3">
                                {recentAttempts.map((attempt) => (
                                    <div
                                        key={attempt.id}
                                        className="flex items-center justify-between p-3 bg-parchment-100 dark:bg-primary-700 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold text-primary-700 dark:text-parchment-200">
                                                Score: {attempt.score}/100
                                            </p>
                                            <p className="text-sm text-primary-600 dark:text-parchment-300">
                                                {new Date(attempt.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className={`text-2xl font-bold ${attempt.percentage >= 80 ? 'text-green-600' :
                                                attempt.percentage >= 60 ? 'text-yellow-600' :
                                                    'text-red-600'
                                            }`}>
                                            {attempt.percentage}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-primary-500 dark:text-parchment-400">
                                <p>No attempts yet. Start your first quiz!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
