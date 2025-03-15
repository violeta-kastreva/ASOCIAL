const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    progress: {
        type: Number,
        default: 0
    },
    agents: [{
        name: String,
        avatar: String,
        instructions: String
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Experiment', experimentSchema); 