const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    avatar: {
        type: String,
        required: [true, 'Please add an avatar']
    },
    instructions: {
        type: String,
        required: [true, 'Please add instructions']
    },
    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Agent', agentSchema); 