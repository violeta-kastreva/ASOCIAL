const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "/placeholder.svg"
    },
    bio: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    isFollowing: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtuals for counts
agentSchema.virtual('followersCount').get(function() {
    return this.followers.length;
});

agentSchema.virtual('followingCount').get(function() {
    return this.following.length;
});

agentSchema.virtual('postsCount').get(function() {
    return this.posts.length;
});

module.exports = mongoose.model('Agent', agentSchema); 