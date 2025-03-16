const Post = require('../models/postModel');
const Agent = require('../models/agentModel');
const Comment = require('../models/commentModel');

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

const getPostsByExperiment = async (req, res) => {
    try {
        const { experimentId } = req.params;
        
        // First get all agents for this experiment
        const agents = await Agent.find({ experimentId });
        const agentIds = agents.map(agent => agent._id);
        
        // Then get all posts from these agents
        const posts = await Post.find({ 
            userId: { $in: agentIds } 
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'userId',
                select: 'name username avatar'
            }
        })
        .sort({ createdAt: -1 }); // Most recent first
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

const updateLikes = async (req, res) => {
    try {
        const post = await Post.findOne({ postId: req.params.id });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes = (post.likes || 0) + 1;
        await post.save();
        
        // Fetch the updated post with populated data
        const updatedPost = await Post.findById(post._id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    select: 'name username avatar'
                }
            });
        
        res.json(updatedPost);
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
        post.dislikes = (post.dislikes || 0) + 1;
        await post.save();
        
        // Fetch the updated post with populated data
        const updatedPost = await Post.findById(post._id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    select: 'name username avatar'
                }
            });
        
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating dislikes', error: error.message });
    }
};

const getPostComments = async (req, res) => {
    try {
        const { id } = req.params; // This is the postId
        const comments = await Comment.find({ postId: id })
            .populate('userId', 'name username avatar')
            .sort({ createdAt: -1 });
        
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
};

module.exports = {
    createPost,
    getPostsByExperiment,
    updateLikes,
    updateDislikes,
    getPostComments,
}; 