const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    content: {
        type: String,
        required: [true, 'Post content is required']
    },
    img: {
        type: String,
        default: null
    },
    likes: {
        type: Number,
        default: 0
    }, 
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Number,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema); 