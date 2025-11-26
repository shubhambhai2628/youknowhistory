import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiDownload, FiUpload, FiBook, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import api from '../api/axios';
import Loader from '../components/Loader';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 0, byCategory: {}, byDifficulty: {} });
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, [categoryFilter, difficultyFilter, searchTerm]);

    const fetchQuestions = async () => {
        try {
            const params = new URLSearchParams();
            if (categoryFilter) params.append('category', categoryFilter);
            if (difficultyFilter) params.append('difficulty', difficultyFilter);
            if (searchTerm) params.append('search', searchTerm);
            params.append('limit', '20');

            const response = await api.get(`/admin/questions?${params.toString()}`);
            setQuestions(response.data.questions);

            // Calculate stats
            const total = response.data.pagination.total;
            const byCategory = {};
            const byDifficulty = {};

            response.data.questions.forEach(q => {
                byCategory[q.category] = (byCategory[q.category] || 0) + 1;
                byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
            });

            setStats({ total, byCategory, byDifficulty });
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            await api.delete(`/admin/questions/${id}`);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Error deleting question');
        }
    };

    const handleExport = async () => {
        try {
            const response = await api.get('/admin/export');
            const dataStr = JSON.stringify(response.data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `questions-export-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
        } catch (error) {
            console.error('Error exporting questions:', error);
            alert('Error exporting questions');
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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-primary-600 dark:text-parchment-300">
                        Manage quiz questions and content
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="card">
                        <div className="text-center">
                            <FiBook className="w-10 h-10 text-golden-500 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-primary-700 dark:text-golden-500">
                                {stats.total}
                            </div>
                            <div className="text-sm text-primary-600 dark:text-parchment-300">
                                Total Questions
                            </div>
                        </div>
                    </div>
                    {Object.entries(stats.byCategory).map(([category, count]) => (
                        <div key={category} className="card">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-700 dark:text-golden-500">
                                    {count}
                                </div>
                                <div className="text-sm text-primary-600 dark:text-parchment-300">
                                    {category}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/add-question')}
                        className="btn-primary flex items-center justify-center space-x-2"
                    >
                        <FiPlus />
                        <span>Add Question</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="btn-secondary flex items-center justify-center space-x-2"
                    >
                        <FiDownload />
                        <span>Export Questions</span>
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="card mb-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3 text-primary-400" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Categories</option>
                            <option value="History">History</option>
                            <option value="Geography">Geography</option>
                            <option value="Politics">Politics</option>
                        </select>
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {questions.map((question) => (
                        <div key={question._id} className="card hover:border-golden-500">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-golden-500 text-sm rounded-full">
                                            {question.category}
                                        </span>
                                        <span className="px-3 py-1 bg-golden-100 dark:bg-golden-900/30 text-golden-700 dark:text-golden-400 text-sm rounded-full">
                                            {question.difficulty}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-primary-800 dark:text-parchment-100 mb-2">
                                        {question.question}
                                    </h3>
                                    <div className="text-sm text-primary-600 dark:text-parchment-300">
                                        <strong>Correct Answer:</strong> {question.options[question.correctOptionIndex]}
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        onClick={() => navigate(`/admin/edit-question/${question._id}`, { state: { question } })}
                                        className="p-2 hover:bg-parchment-200 dark:hover:bg-primary-700 rounded-lg transition-colors"
                                        aria-label="Edit"
                                    >
                                        <FiEdit className="w-5 h-5 text-primary-600 dark:text-golden-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(question._id)}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        aria-label="Delete"
                                    >
                                        <FiTrash2 className="w-5 h-5 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
