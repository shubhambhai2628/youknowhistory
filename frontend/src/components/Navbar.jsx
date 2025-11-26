import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiHome, FiTrendingUp, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { to: '/dashboard', label: 'Dashboard', icon: FiHome, show: isAuthenticated },
        { to: '/leaderboard', label: 'Leaderboard', icon: FiTrendingUp, show: true },
        { to: '/profile', label: 'Profile', icon: FiUser, show: isAuthenticated },
        { to: '/admin', label: 'Admin', icon: FiShield, show: isAdmin },
    ];

    return (
        <nav className="bg-white dark:bg-primary-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
                        <div className="text-2xl font-serif font-bold text-primary-600 dark:text-golden-500">
                            📚 You Know History
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.filter(link => link.show).map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-primary-700 dark:text-parchment-200 hover:bg-golden-100 dark:hover:bg-primary-700 transition-colors duration-200"
                            >
                                <link.icon className="w-4 h-4" />
                                <span>{link.label}</span>
                            </Link>
                        ))}

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-golden-100 dark:bg-primary-700 text-primary-700 dark:text-golden-500 hover:bg-golden-200 dark:hover:bg-primary-600 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-primary-700 dark:text-parchment-200">
                                    {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-golden-100 dark:bg-primary-700 text-primary-700 dark:text-golden-500"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg bg-golden-100 dark:bg-primary-700 text-primary-700 dark:text-golden-500"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 animate-slide-down">
                        <div className="flex flex-col space-y-2">
                            {navLinks.filter(link => link.show).map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-primary-700 dark:text-parchment-200 hover:bg-golden-100 dark:hover:bg-primary-700 transition-colors duration-200"
                                >
                                    <link.icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-primary-600 dark:text-parchment-300">
                                        {user?.name}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 text-center"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
