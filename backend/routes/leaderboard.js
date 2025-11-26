import express from 'express';
import Attempt from '../models/Attempt.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/leaderboard?period=7d|30d|all
// @desc    Get leaderboard for specified period
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { period = 'all' } = req.query;

        let dateFilter = {};
        const now = new Date();

        // Set date filter based on period
        if (period === '7d') {
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            dateFilter = { createdAt: { $gte: sevenDaysAgo } };
        } else if (period === '30d') {
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            dateFilter = { createdAt: { $gte: thirtyDaysAgo } };
        }
        // For 'all', no date filter

        // Get all attempts in the period
        const attempts = await Attempt.find(dateFilter)
            .populate('userId', 'name')
            .sort({ score: -1, createdAt: 1 });

        // Group by user and get their best score
        const userBestScores = {};

        attempts.forEach(attempt => {
            const userId = attempt.userId._id.toString();
            const userName = attempt.userId.name;

            if (!userBestScores[userId] || attempt.score > userBestScores[userId].score) {
                userBestScores[userId] = {
                    userId,
                    userName,
                    score: attempt.score,
                    percentage: attempt.percentage,
                    date: attempt.createdAt
                };
            }
        });

        // Convert to array and sort by score
        const leaderboard = Object.values(userBestScores)
            .sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return new Date(a.date) - new Date(b.date); // Earlier date wins in tie
            })
            .slice(0, 50) // Top 50
            .map((entry, index) => ({
                rank: index + 1,
                userName: entry.userName,
                score: entry.score,
                percentage: entry.percentage,
                date: entry.date
            }));

        res.json({
            period,
            leaderboard,
            totalUsers: leaderboard.length
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Server error fetching leaderboard' });
    }
});

export default router;
