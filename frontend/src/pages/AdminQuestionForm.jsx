import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import api from '../api/axios';

const AdminQuestionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editQuestion = location.state?.question;
    const isEditMode = !!editQuestion;

    const [formData, setFormData] = useState({
        question: editQuestion?.question || '',
        option1: editQuestion?.options[0] || '',
        option2: editQuestion?.options[1] || '',
        option3: editQuestion?.options[2] || '',
        option4: editQuestion?.options[3] || '',
        correctOptionIndex: editQuestion?.correctOptionIndex ?? 0,
        category: editQuestion?.category || 'History',
        difficulty: editQuestion?.difficulty || 'Medium',
        explanation: editQuestion?.explanation || '',
        imageUrl: editQuestion?.imageUrl || '',
    });

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.question.trim()) {
            setError('Question is required');
            return;
        }

        if (![formData.option1, formData.option2, formData.option3, formData.option4].every(opt => opt.trim())) {
            setError('All 4 options are required');
            return;
        }

        if (!formData.explanation.trim()) {
            setError('Explanation is required');
            return;
        }

        setSubmitting(true);

        try {
            const payload = {
                question: formData.question,
                options: [formData.option1, formData.option2, formData.option3, formData.option4],
                correctOptionIndex: parseInt(formData.correctOptionIndex),
                category: formData.category,
                difficulty: formData.difficulty,
                explanation: formData.explanation,
                imageUrl: formData.imageUrl || null,
            };

            if (isEditMode) {
                await api.put(`/admin/questions/${editQuestion._id}`, payload);
            } else {
                await api.post('/admin/questions', payload);
            }

            navigate('/admin');
        } catch (err) {
            console.error('Error saving question:', err);
            setError(err.response?.data?.error || 'Error saving question');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-2">
                        {isEditMode ? 'Edit Question' : 'Add New Question'}
                    </h1>
                    <p className="text-primary-600 dark:text-parchment-300">
                        {isEditMode ? 'Update the question details below' : 'Fill in all the details to create a new question'}
                    </p>
                </div>

                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 rounded-lg text-red-700 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Question Text */}
                        <div>
                            <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                Question <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                rows="3"
                                className="input-field"
                                placeholder="Enter the question..."
                                required
                            />
                        </div>

                        {/* Options */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num}>
                                    <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                        Option {num} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name={`option${num}`}
                                        value={formData[`option${num}`]}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder={`Option ${num}`}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Correct Answer */}
                        <div>
                            <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                Correct Option <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="correctOptionIndex"
                                value={formData.correctOptionIndex}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="0">Option 1</option>
                                <option value="1">Option 2</option>
                                <option value="2">Option 3</option>
                                <option value="3">Option 4</option>
                            </select>
                        </div>

                        {/* Category and Difficulty */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="History">History</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Politics">Politics</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                    Difficulty <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        {/* Explanation */}
                        <div>
                            <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                Explanation <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="explanation"
                                value={formData.explanation}
                                onChange={handleChange}
                                rows="4"
                                className="input-field"
                                placeholder="Provide a detailed explanation for the correct answer..."
                                required
                            />
                        </div>

                        {/* Image URL (optional) */}
                        <div>
                            <label className="block text-sm font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                Image URL (Optional)
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="btn-outline flex-1 flex items-center justify-center space-x-2"
                            >
                                <FiX />
                                <span>Cancel</span>
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
                            >
                                <FiSave />
                                <span>{submitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionForm;
