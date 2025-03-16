const Comment = require('../models/commentModel');

const createComment = async (req, res) => {
    try {
        const { userId, postId, content } = req.body;
        const comment = await Comment.create({
            userId,
            postId,
            content
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};

module.exports = {
    createComment
}; 