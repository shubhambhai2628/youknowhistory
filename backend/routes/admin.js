import express from 'express';
import { body, validationResult } from 'express-validator';
import Question from '../models/Question.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authenticateToken, isAdmin);

// Helper function to handle validation errors
const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return null;
};

// @route   GET /api/admin/questions
// @desc    Get all questions with optional filters
// @access  Private (Admin only)
router.get('/questions', async (req, res) => {
    try {
        const { category, difficulty, search, page = 1, limit = 50 } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        if (search) {
            filter.$or = [
                { question: { $regex: search, $options: 'i' } },
                { explanation: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const questions = await Question.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Question.countDocuments(filter);

        res.json({
            questions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Server error fetching questions' });
    }
});

// @route   POST /api/admin/questions
// @desc    Add a new question
// @access  Private (Admin only)
router.post('/questions', [
    body('question').trim().notEmpty().withMessage('Question is required'),
    body('options').isArray({ min: 4, max: 4 }).withMessage('Exactly 4 options required'),
    body('correctOptionIndex').isInt({ min: 0, max: 3 }).withMessage('Correct option must be 0-3'),
    body('category').isIn(['History', 'Geography', 'Politics']).withMessage('Invalid category'),
    body('difficulty').isIn(['Easy', 'Medium', 'Hard']).withMessage('Invalid difficulty'),
    body('explanation').trim().notEmpty().withMessage('Explanation is required')
], async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    try {
        const { question, options, correctOptionIndex, category, difficulty, explanation, imageUrl } = req.body;

        const newQuestion = new Question({
            question,
            options,
            correctOptionIndex,
            category,
            difficulty,
            explanation,
            imageUrl: imageUrl || null
        });

        await newQuestion.save();

        res.status(201).json({
            message: 'Question added successfully',
            question: newQuestion
        });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Server error adding question' });
    }
});

// @route   PUT /api/admin/questions/:id
// @desc    Update a question
// @access  Private (Admin only)
router.put('/questions/:id', [
    body('question').optional().trim().notEmpty().withMessage('Question cannot be empty'),
    body('options').optional().isArray({ min: 4, max: 4 }).withMessage('Exactly 4 options required'),
    body('correctOptionIndex').optional().isInt({ min: 0, max: 3 }).withMessage('Correct option must be 0-3'),
    body('category').optional().isIn(['History', 'Geography', 'Politics']).withMessage('Invalid category'),
    body('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']).withMessage('Invalid difficulty'),
    body('explanation').optional().trim().notEmpty().withMessage('Explanation cannot be empty')
], async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    try {
        const { id } = req.params;
        const updates = req.body;

        const question = await Question.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({
            message: 'Question updated successfully',
            question
        });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Server error updating question' });
    }
});

// @route   DELETE /api/admin/questions/:id
// @desc    Delete a question
// @access  Private (Admin only)
router.delete('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({
            message: 'Question deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Server error deleting question' });
    }
});

// @route   POST /api/admin/import
// @desc    Import questions from JSON
// @access  Private (Admin only)
router.post('/import', async (req, res) => {
    try {
        const { questions } = req.body;

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ error: 'Invalid questions array' });
        }

        // Validate each question
        const validQuestions = questions.filter(q =>
            q.question &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            typeof q.correctOptionIndex === 'number' &&
            q.correctOptionIndex >= 0 &&
            q.correctOptionIndex <= 3 &&
            ['History', 'Geography', 'Politics'].includes(q.category) &&
            ['Easy', 'Medium', 'Hard'].includes(q.difficulty) &&
            q.explanation
        );

        if (validQuestions.length === 0) {
            return res.status(400).json({ error: 'No valid questions found' });
        }

        // Insert questions
        const inserted = await Question.insertMany(validQuestions, { ordered: false });

        res.json({
            message: 'Questions imported successfully',
            imported: inserted.length,
            total: questions.length
        });
    } catch (error) {
        console.error('Error importing questions:', error);
        res.status(500).json({ error: 'Server error importing questions' });
    }
});

// @route   GET /api/admin/export
// @desc    Export all questions as JSON
// @access  Private (Admin only)
router.get('/export', async (req, res) => {
    try {
        const questions = await Question.find().select('-__v');

        res.json({
            questions,
            total: questions.length,
            exportDate: new Date()
        });
    } catch (error) {
        console.error('Error exporting questions:', error);
        res.status(500).json({ error: 'Server error exporting questions' });
    }
});

export default router;
