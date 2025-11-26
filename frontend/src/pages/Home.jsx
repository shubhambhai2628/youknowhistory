import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiGlobe, FiFlag, FiArrowRight, FiAward, FiUsers } from 'react-icons/fi';

const Home = () => {
    const features = [
        {
            icon: FiBook,
            title: 'History',
            description: 'Explore ancient civilizations to modern events',
            color: 'text-blue-600',
        },
        {
            icon: FiGlobe,
            title: 'Geography',
            description: 'Discover the world and its wonders',
            color: 'text-green-600',
        },
        {
            icon: FiFlag,
            title: 'Politics',
            description: 'Understand governance and civics',
            color: 'text-red-600',
        },
    ];

    const stats = [
        { label: 'Questions', value: '50+', icon: FiBook },
        { label: 'Categories', value: '3', icon: FiGlobe },
        { label: 'Active Users', value: '100+', icon: FiUsers },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-golden-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-golden-500 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
                            Test Your <span className="text-golden-400">Knowledge</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-parchment-100 mb-8 max-w-3xl mx-auto">
                            Challenge yourself with comprehensive MCQ tests on History, Geography, and Politics.
                            25 questions. 100 marks. Are you ready?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/signup"
                                className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 group"
                            >
                                <span>Get Started</span>
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="btn-outline text-lg px-8 py-4 bg-white/10 backdrop-blur-sm"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-parchment-50 dark:bg-primary-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-4">
                            Three Pillars of Knowledge
                        </h2>
                        <p className="text-lg text-primary-600 dark:text-parchment-300">
                            Master the subjects that shape our world
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card hover:scale-105 transition-transform duration-300 text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className={`p-4 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-primary-600 dark:text-parchment-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-golden-500 to-golden-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-2">
                                    <stat.icon className="w-8 h-8 text-primary-900" />
                                </div>
                                <div className="text-4xl font-bold text-primary-900 mb-1">{stat.value}</div>
                                <div className="text-primary-800 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white dark:bg-primary-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary-700 dark:text-golden-500 mb-4">
                            How It Works
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {['Sign Up', 'Take Quiz', 'Get Results', 'Compete'].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-golden-500 to-golden-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-primary-700 dark:text-parchment-200 mb-2">
                                    {step}
                                </h3>
                                <p className="text-primary-600 dark:text-parchment-300 text-sm">
                                    {index === 0 && 'Create your free account in seconds'}
                                    {index === 1 && 'Answer 25 randomized questions'}
                                    {index === 2 && 'See your score and detailed review'}
                                    {index === 3 && 'Climb the leaderboard'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FiAward className="w-16 h-16 text-golden-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-serif font-bold text-white mb-4">
                        Ready to Test Your Knowledge?
                    </h2>
                    <p className="text-xl text-parchment-100 mb-8">
                        Join thousands of learners and see where you rank!
                    </p>
                    <Link
                        to="/signup"
                        className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
                    >
                        <span>Start Now</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
