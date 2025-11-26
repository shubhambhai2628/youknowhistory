import express from 'express';
import User from '../models/User.js';
import Attempt from '../models/Attempt.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error fetching profile' });
    }
});

// @route   GET /api/user/history
// @desc    Get user's quiz attempt history
// @access  Private
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const attempts = await Attempt.find({ userId: req.user.userId })
            .sort({ createdAt: -1 })
            .select('-questions -userAnswers')
            .limit(50);

        res.json({
            attempts: attempts.map(a => ({
                id: a._id,
                score: a.score,
                percentage: a.percentage,
                categoryBreakdown: a.categoryBreakdown,
                date: a.createdAt
            }))
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Server error fetching history' });
    }
});

// @route   GET /api/user/stats
// @desc    Get user's overall statistics
// @access  Private
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const attempts = await Attempt.find({ userId: req.user.userId });

        if (attempts.length === 0) {
            return res.json({
                totalAttempts: 0,
                averageScore: 0,
                bestScore: 0,
                categoryAccuracy: {
                    History: 0,
                    Geography: 0,
                    Politics: 0
                }
            });
        }

        // Calculate statistics
        const totalAttempts = attempts.length;
        const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
        const averageScore = Math.round(totalScore / totalAttempts);
        const bestScore = Math.max(...attempts.map(a => a.score));

        // Calculate category-wise accuracy
        const categoryTotals = {
            History: { correct: 0, total: 0 },
            Geography: { correct: 0, total: 0 },
            Politics: { correct: 0, total: 0 }
        };

        attempts.forEach(attempt => {
            ['History', 'Geography', 'Politics'].forEach(category => {
                if (attempt.categoryBreakdown[category]) {
                    categoryTotals[category].correct += attempt.categoryBreakdown[category].correct;
                    categoryTotals[category].total += attempt.categoryBreakdown[category].total;
                }
            });
        });

        const categoryAccuracy = {
            History: categoryTotals.History.total > 0
                ? Math.round((categoryTotals.History.correct / categoryTotals.History.total) * 100)
                : 0,
            Geography: categoryTotals.Geography.total > 0
                ? Math.round((categoryTotals.Geography.correct / categoryTotals.Geography.total) * 100)
                : 0,
            Politics: categoryTotals.Politics.total > 0
                ? Math.round((categoryTotals.Politics.correct / categoryTotals.Politics.total) * 100)
                : 0
        };

        res.json({
            totalAttempts,
            averageScore,
            bestScore,
            categoryAccuracy
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Server error fetching statistics' });
    }
});

export default router;
