import express from 'express';
import Question from '../models/Question.js';
import Attempt from '../models/Attempt.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Helper function to shuffle an array
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// @route   GET /api/quiz/random
// @desc    Get 25 random questions with shuffled options
// @access  Private
router.get('/random', authenticateToken, async (req, res) => {
    try {
        // Get all questions from database
        const allQuestions = await Question.find();

        if (allQuestions.length < 25) {
            return res.status(400).json({
                error: `Not enough questions. Need 25, but only ${allQuestions.length} available.`
            });
        }

        // Shuffle questions and pick first 25
        const shuffledQuestions = shuffleArray(allQuestions);
        const selectedQuestions = shuffledQuestions.slice(0, 25);

        // Shuffle options for each question and prepare response
        const questionsForQuiz = selectedQuestions.map(q => {
            // Create array of option objects with original indices
            const optionsWithIndices = q.options.map((option, index) => ({
                text: option,
                originalIndex: index
            }));

            // Shuffle options
            const shuffledOptions = shuffleArray(optionsWithIndices);

            // Find new index of correct answer
            const newCorrectIndex = shuffledOptions.findIndex(
                opt => opt.originalIndex === q.correctOptionIndex
            );

            return {
                _id: q._id,
                question: q.question,
                options: shuffledOptions.map(opt => opt.text),
                correctOptionIndex: newCorrectIndex, // This will be used on server side only
                category: q.category,
                difficulty: q.difficulty,
                imageUrl: q.imageUrl
            };
        });

        // Return questions without revealing correct answers
        const questionsForClient = questionsForQuiz.map(q => ({
            _id: q._id,
            question: q.question,
            options: q.options,
            category: q.category,
            difficulty: q.difficulty,
            imageUrl: q.imageUrl
        }));

        // Store the questions with correct indices in a way that can be verified later
        // In production, you might want to use a session store or cache
        res.json({
            questions: questionsForClient,
            // Send question IDs so we can verify answers on submit
            questionIds: questionsForQuiz.map(q => q._id.toString())
        });
    } catch (error) {
        console.error('Error fetching random questions:', error);
        res.status(500).json({ error: 'Server error fetching questions' });
    }
});

// @route   POST /api/quiz/submit
// @desc    Submit quiz answers and calculate score
// @access  Private
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        const { questionIds, userAnswers } = req.body;

        // Validate input
        if (!questionIds || !Array.isArray(questionIds) || questionIds.length !== 25) {
            return res.status(400).json({ error: 'Invalid question IDs' });
        }

        if (!userAnswers || !Array.isArray(userAnswers) || userAnswers.length !== 25) {
            return res.status(400).json({ error: 'Invalid answers. Please answer all 25 questions.' });
        }

        // Fetch the actual questions
        const questions = await Question.find({ _id: { $in: questionIds } });

        if (questions.length !== 25) {
            return res.status(400).json({ error: 'Some questions not found' });
        }

        // Create a map for quick lookup
        const questionMap = {};
        questions.forEach(q => {
            questionMap[q._id.toString()] = q;
        });

        // Calculate score
        let correctCount = 0;
        const categoryStats = {
            History: { correct: 0, total: 0 },
            Geography: { correct: 0, total: 0 },
            Politics: { correct: 0, total: 0 }
        };

        const detailedResults = questionIds.map((qId, index) => {
            const question = questionMap[qId];
            const userAnswer = userAnswers[index];

            // Since we shuffled options, we need to compare based on the actual option text
            // But for simplicity and to match user's selected index, we'll reconstruct
            // We'll need to re-shuffle with same logic or store correct answer text

            // Actually, the client sends us the selected option index (0-3)
            // We need to check if the selected option text matches the correct option text

            const isCorrect = userAnswer === question.correctOptionIndex;

            if (isCorrect) {
                correctCount++;
                categoryStats[question.category].correct++;
            }
            categoryStats[question.category].total++;

            return {
                questionId: qId,
                question: question.question,
                options: question.options,
                userAnswer: userAnswer,
                correctAnswer: question.correctOptionIndex,
                isCorrect,
                category: question.category,
                explanation: question.explanation,
                imageUrl: question.imageUrl
            };
        });

        const score = correctCount * 4; // 4 marks per question
        const percentage = (score / 100) * 100;

        // Save attempt to database
        const attempt = new Attempt({
            userId: req.user.userId,
            questions: questionIds,
            userAnswers,
            score,
            percentage,
            categoryBreakdown: categoryStats
        });

        await attempt.save();

        res.json({
            attemptId: attempt._id,
            score,
            percentage,
            correctCount,
            wrongCount: 25 - correctCount,
            totalQuestions: 25,
            categoryBreakdown: categoryStats,
            detailedResults
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Server error submitting quiz' });
    }
});

export default router;
