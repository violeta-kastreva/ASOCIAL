const Post = require('../models/postModel');

const createPost = async (req, res) => {
    try {
        const { postId , userId, content, img } = req.body;
        const post = await Post.create({
            postId,
            userId,
            content,
            img
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

const updateLikes = async (req, res) => {
    try {
        const post = await Post.findOne({ postId: req.params.id });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes = post.likes + 1;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating likes', error: error.message });
    }
};

const updateDislikes = async (req, res) => {
    try {
        const post = await Post.findOne({ postId: req.params.id });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.dislikes = post.dislikes + 1;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating dislikes', error: error.message });
    }
};

module.exports = {
    createPost,
    updateLikes,
    updateDislikes
}; 