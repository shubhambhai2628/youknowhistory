import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question text is required'],
        trim: true
    },
    options: {
        type: [String],
        required: [true, 'Options are required'],
        validate: {
            validator: function (v) {
                return v.length === 4;
            },
            message: 'Exactly 4 options are required'
        }
    },
    correctOptionIndex: {
        type: Number,
        required: [true, 'Correct option index is required'],
        min: 0,
        max: 3
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['History', 'Geography', 'Politics']
    },
    difficulty: {
        type: String,
        required: [true, 'Difficulty is required'],
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    explanation: {
        type: String,
        required: [true, 'Explanation is required'],
        trim: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
