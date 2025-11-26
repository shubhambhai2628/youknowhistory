import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    userAnswers: [{
        type: Number,
        min: 0,
        max: 3
    }],
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    categoryBreakdown: {
        History: {
            correct: { type: Number, default: 0 },
            total: { type: Number, default: 0 }
        },
        Geography: {
            correct: { type: Number, default: 0 },
            total: { type: Number, default: 0 }
        },
        Politics: {
            correct: { type: Number, default: 0 },
            total: { type: Number, default: 0 }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

const Attempt = mongoose.model('Attempt', attemptSchema);

export default Attempt;
