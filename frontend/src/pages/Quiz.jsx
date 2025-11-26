import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiCheck, FiAlertCircle } from 'react-icons/fi';
import api from '../api/axios';
import Loader from '../components/Loader';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';

const Quiz = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [questionIds, setQuestionIds] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(25).fill(null));
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [timerEnabled, setTimerEnabled] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/quiz/random');
            setQuestions(response.data.questions);
            setQuestionIds(response.data.questionIds);
        } catch (error) {
            console.error('Error fetching questions:', error);
            if (error.response?.status === 400) {
                alert('Not enough questions in database. Please contact admin.');
                navigate('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSelectOption = (optionIndex) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setUserAnswers(newAnswers);
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = async () => {
        // Check if all questions are answered
        const unanswered = userAnswers.filter(a => a === null).length;
        if (unanswered > 0) {
            const confirm = window.confirm(
                `You have ${unanswered} unanswered question(s). Submit anyway?`
            );
            if (!confirm) return;
        }

        setShowConfirmModal(false);
        setSubmitting(true);

        try {
            const response = await api.post('/quiz/submit', {
                questionIds,
                userAnswers: userAnswers.map(a => a === null ? -1 : a), // -1 for unanswered
            });

            // Navigate to results page with data
            navigate('/result', { state: { resultData: response.data } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('Error submitting quiz. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleTimeUp = () => {
        alert('Time is up! Submitting your quiz...');
        handleSubmit();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader text="Loading questions..." />
            </div>
        );
    }

    if (submitting) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader text="Submitting your quiz..." />
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = userAnswers.filter(a => a !== null).length;

    return (
        <div className="min-h-screen bg-parchment-50 dark:bg-primary-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h1 className="text-3xl font-serif font-bold text-primary-700 dark:text-golden-500">
                            Quiz in Progress
                        </h1>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2 text-sm text-primary-700 dark:text-parchment-200">
                                <input
                                    type="checkbox"
                                    checked={timerEnabled}
                                    onChange={(e) => setTimerEnabled(e.target.checked)}
                                    className="rounded"
                                />
                                <span>Enable Timer (30 min)</span>
                            </label>
                        </div>
                    </div>

                    {timerEnabled && (
                        <div className="mb-4">
                            <Timer duration={1800} onTimeUp={handleTimeUp} enabled={timerEnabled} />
                        </div>
                    )}

                    <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-primary-600 dark:text-parchment-300">
                            Answered: {answeredCount}/25
                        </span>
                        <span className="text-golden-600 font-semibold">
                            {currentQuestion?.category}
                        </span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="card mb-6 animate-fade-in">
                    <div className="mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-xl font-semibold text-primary-800 dark:text-parchment-100 flex-1">
                                {currentQuestion?.question}
                            </h2>
                            <span className="ml-4 px-3 py-1 bg-golden-100 dark:bg-golden-900/30 text-golden-700 dark:text-golden-400 text-sm rounded-full">
                                {currentQuestion?.difficulty}
                            </span>
                        </div>

                        {currentQuestion?.imageUrl && (
                            <img
                                src={currentQuestion.imageUrl}
                                alt="Question visual"
                                className="w-full max-h-64 object-contain rounded-lg mb-4"
                            />
                        )}
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {currentQuestion?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectOption(index)}
                                className={`quiz-option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${userAnswers[currentQuestionIndex] === index
                                            ? 'border-golden-500 bg-golden-500'
                                            : 'border-primary-400 dark:border-primary-500'
                                        }`}>
                                        {userAnswers[currentQuestionIndex] === index && (
                                            <FiCheck className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <span className="text-left">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <FiChevronLeft />
                        <span>Previous</span>
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={() => setShowConfirmModal(true)}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <FiCheck />
                            <span>Submit Quiz</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <span>Next</span>
                            <FiChevronRight />
                        </button>
                    )}
                </div>

                {/* Question Navigator (optional: show all questions) */}
                <div className="mt-8 card">
                    <h3 className="text-lg font-semibold text-primary-700 dark:text-golden-500 mb-4">
                        Question Navigator
                    </h3>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={`p-2 rounded-lg text-sm font-semibold transition-all ${index === currentQuestionIndex
                                        ? 'bg-primary-600 text-white'
                                        : userAnswers[index] !== null
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-parchment-200 dark:bg-primary-700 text-primary-600 dark:text-parchment-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Confirm Submit Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="card max-w-md w-full animate-slide-up">
                        <FiAlertCircle className="w-12 h-12 text-golden-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-serif font-bold text-primary-700 dark:text-golden-500 text-center mb-4">
                            Submit Quiz?
                        </h3>
                        <p className="text-center text-primary-600 dark:text-parchment-300 mb-6">
                            You have answered {answeredCount} out of 25 questions.
                            Are you sure you want to submit?
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="btn-outline flex-1"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="btn-primary flex-1"
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
