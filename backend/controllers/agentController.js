const Agent = require('../models/agentModel');
const Post = require('../models/postModel');

const updateFollowCounts = async (req, res) => {
    try {
        const { followerId, followeeId } = req.body;
        
        const [follower, followee] = await Promise.all([
            Agent.findById(followerId),
            Agent.findById(followeeId)
        ]);

        if (!follower || !followee) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        // Check if already following
        const isFollowing = follower.following.includes(followeeId);
        
        if (isFollowing) {
            // Unfollow: Remove from arrays
            follower.following = follower.following.filter(id => id.toString() !== followeeId);
            followee.followers = followee.followers.filter(id => id.toString() !== followerId);
        } else {
            // Follow: Add to arrays
            follower.following.push(followeeId);
            followee.followers.push(followerId);
        }

        await Promise.all([
            follower.save(),
            followee.save()
        ]);

        // Return updated counts and following status
        res.json({ 
            message: `Successfully ${isFollowing ? 'unfollowed' : 'followed'} agent`,
            followerCount: followee.followers.length,
            followingCount: follower.following.length,
            isFollowing: !isFollowing
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating follow counts', error: error.message });
    }
};

// Get all agents for an experiment
const getAgentsByExperiment = async (req, res) => {
  try {
    const { experimentId } = req.params;
    const agents = await Agent.find({ experimentId })
      .populate({
        path: 'posts',
        select: 'count'
      })
      .populate('followers')
      .populate('following');
    
    // Get post counts and transform data for each agent
    const agentsWithStats = await Promise.all(agents.map(async (agent) => {
      const postCount = await Post.countDocuments({ userId: agent._id });
      const agentObj = agent.toObject({ virtuals: true }); // Include virtuals
      
      return {
        ...agentObj,
        posts: postCount,
        followers: agentObj.followers.length, // Get the length of followers array
        following: agentObj.following.length, // Get the length of following array
      };
    }));

    res.json(agentsWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    updateFollowCounts,
    getAgentsByExperiment
}; 