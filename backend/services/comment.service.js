const db = require('../models');
const Comment = db['Comment'];
const commentService = {};

commentService.create = async ({content, agent_id, post_id}) => {
    try {
        const comment = await Comment.create({ content, agentId: agent_id, postId: post_id });

        return comment;
    } catch (error) {
        throw error;
    }
};


module.exports = commentService;
