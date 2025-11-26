import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiBookOpen, FiFilter } from 'react-icons/fi';

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const detailedResults = location.state?.detailedResults;
    const [filter, setFilter] = useState('all'); // all, correct, wrong

    if (!detailedResults) {
        navigate('/dashboard');
        return null;
    }

    const filteredResults = detailedResults.filter(result => {
        if (filter === 'correct') return result.isCorrect;
        if (filter === 'wrong') return !result.isCorrect;
        return true;
    });

    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-4">
                        Answer Review
                    </h1>

                    {/* Filter */}
                    <div className="flex items-center space-x-2 mb-4">
                        <FiFilter className="text-primary-600 dark:text-parchment-300" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input-field w-auto"
                        >
                            <option value="all">All Questions ({detailedResults.length})</option>
                            <option value="correct">
                                Correct Only ({detailedResults.filter(r => r.isCorrect).length})
                            </option>
                            <option value="wrong">
                                Wrong Only ({detailedResults.filter(r => !r.isCorrect).length})
                            </option>
                        </select>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-6">
                    {filteredResults.map((result, index) => (
                        <div
                            key={result.questionId}
                            className={`card border-2 ${result.isCorrect
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                                    : 'border-red-500 bg-red-50 dark:bg-red-900/10'
                                }`}
                        >
                            {/* Question Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3 flex-1">
                                    {result.isCorrect ? (
                                        <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    ) : (
                                        <FiXCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                    )}
                                    <h3 className="text-lg font-semibold text-primary-800 dark:text-parchment-100">
                                        Question {detailedResults.indexOf(result) + 1}
                                    </h3>
                                </div>
                                <span className="px-3 py-1 bg-golden-100 dark:bg-golden-900/30 text-golden-700 dark:text-golden-400 text-sm rounded-full">
                                    {result.category}
                                </span>
                            </div>

                            {/* Question Text */}
                            <p className="text-primary-700 dark:text-parchment-200 mb-4 font-medium">
                                {result.question}
                            </p>

                            {result.imageUrl && (
                                <img
                                    src={result.imageUrl}
                                    alt="Question visual"
                                    className="w-full max-h-48 object-contain rounded-lg mb-4"
                                />
                            )}

                            {/* Options */}
                            <div className="space-y-2 mb-4">
                                {result.options.map((option, optIndex) => {
                                    const isUserAnswer = result.userAnswer === optIndex;
                                    const isCorrectAnswer = result.correctAnswer === optIndex;

                                    return (
                                        <div
                                            key={optIndex}
                                            className={`p-3 rounded-lg border-2 ${isCorrectAnswer
                                                    ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                                                    : isUserAnswer && !isCorrectAnswer
                                                        ? 'border-red-500 bg-red-100 dark:bg-red-900/20'
                                                        : 'border-parchment-300 dark:border-primary-700 bg-white dark:bg-primary-800'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-primary-700 dark:text-parchment-200">
                                                    {option}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    {isCorrectAnswer && (
                                                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                            ✓ Correct
                                                        </span>
                                                    )}
                                                    {isUserAnswer && !isCorrectAnswer && (
                                                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                                                            Your Answer
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            <div className="bg-parchment-100 dark:bg-primary-700 rounded-lg p-4 border-l-4 border-golden-500">
                                <div className="flex items-start space-x-2">
                                    <FiBookOpen className="w-5 h-5 text-golden-600 dark:text-golden-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-primary-700 dark:text-golden-500 mb-1">
                                            Explanation
                                        </h4>
                                        <p className="text-sm text-primary-600 dark:text-parchment-300">
                                            {result.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn-primary px-8 py-3"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
