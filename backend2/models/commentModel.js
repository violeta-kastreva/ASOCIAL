const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    postId: {
        type: Number,
        ref: 'Post',
        required: [true, 'Post ID is required']
    },
    content: {
        type: String,
        required: [true, 'Comment content is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema); 