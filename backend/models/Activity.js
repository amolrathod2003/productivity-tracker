const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    duration: {
        type: Number, // in seconds
        required: [true, 'Duration is required']
    },
    category: {
        type: String,
        enum: ['Study', 'Coding', 'Entertainment', 'Work', 'Other'],
        default: 'Other'
    },
    type: {
        type: String,
        enum: ['Timer', 'Pomodoro'],
        default: 'Timer'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
