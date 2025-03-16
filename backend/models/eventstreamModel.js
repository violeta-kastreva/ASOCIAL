const mongoose = require('mongoose');

const eventstreamSchema = new mongoose.Schema({
    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment',
        required: true
    },
    timeStep: {
        type: Number,
        required: true,
        default: 0
    },
    id: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Number,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    followeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Eventstream', eventstreamSchema); 