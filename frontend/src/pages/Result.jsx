import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiAward, FiShare2, FiEye, FiHome } from 'react-icons/fi';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resultData = location.state?.resultData;

    if (!resultData) {
        navigate('/dashboard');
        return null;
    }

    const { score, percentage, correctCount, wrongCount, totalQuestions, categoryBreakdown, detailedResults, attemptId } = resultData;

    const getGrade = () => {
        if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', message: 'Outstanding!' };
        if (percentage >= 80) return { grade: 'A', color: 'text-green-500', message: 'Excellent!' };
        if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', message: 'Good Job!' };
        if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', message: 'Fair!' };
        return { grade: 'D', color: 'text-red-600', message: 'Keep Practicing!' };
    };

    const gradeInfo = getGrade();

    const shareOnWhatsApp = () => {
        const text = `🎓 I scored ${score}/100 (${percentage}%) on You Know History quiz!%0A%0ATry it yourself and test your knowledge of History, Geography, and Politics!`;
        const url = `https://wa.me/?text=${text}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Results Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <FiAward className="w-20 h-20 text-golden-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-2">
                        Quiz Completed!
                    </h1>
                    <p className="text-primary-600 dark:text-parchment-300">
                        Here's how you performed
                    </p>
                </div>

                {/* Score Card */}
                <div className="card bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white mb-8 animate-slide-up">
                    <div className="text-center">
                        <div className={`text-7xl font-bold mb-4 ${gradeInfo.color === 'text-green-600' ? 'text-golden-400' : 'text-white'}`}>
                            {score}/100
                        </div>
                        <div className="text-3xl font-serif font-bold mb-2">{percentage}%</div>
                        <div className="text-xl mb-6">{gradeInfo.message}</div>
                        <div className="flex justify-center items-center space-x-8">
                            <div>
                                <FiCheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold">{correctCount}</div>
                                <div className="text-sm text-parchment-200">Correct</div>
                            </div>
                            <div>
                                <FiXCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold">{wrongCount}</div>
                                <div className="text-sm text-parchment-200">Wrong</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-6">
                        Category Performance
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(categoryBreakdown).map(([category, stats]) => {
                            const categoryPercentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                            return (
                                <div key={category}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-primary-700 dark:text-parchment-200">
                                            {category}
                                        </span>
                                        <span className="text-sm text-primary-600 dark:text-parchment-300">
                                            {stats.correct}/{stats.total} ({categoryPercentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-parchment-300 dark:bg-primary-700 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-golden-500 to-golden-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${categoryPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <button
                        onClick={shareOnWhatsApp}
                        className="btn-secondary flex items-center justify-center space-x-2"
                    >
                        <FiShare2 />
                        <span>Share Score</span>
                    </button>
                    <button
                        onClick={() => navigate('/review', { state: { detailedResults } })}
                        className="btn-primary flex items-center justify-center space-x-2"
                    >
                        <FiEye />
                        <span>Review Answers</span>
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn-outline flex items-center justify-center space-x-2"
                    >
                        <FiHome />
                        <span>Dashboard</span>
                    </button>
                </div>

                {/* Motivational Message */}
                <div className="card bg-golden-100 dark:bg-golden-900/20 border-2 border-golden-500">
                    <p className="text-center text-primary-700 dark:text-golden-400 font-semibold">
                        {percentage >= 80 ? '🎉 Amazing performance! Keep up the excellent work!' :
                            percentage >= 60 ? '👍 Good effort! Review the explanations to improve further.' :
                                '💪 Don\'t worry! Practice makes perfect. Review and try again!'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Result;
