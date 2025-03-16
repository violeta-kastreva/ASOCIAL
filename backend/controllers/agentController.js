const Agent = require('../models/agentModel');

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

        follower.followingCount = (follower.followingCount || 0) + 1;
        followee.followersCount = (followee.followersCount || 0) + 1;

        await Promise.all([
            follower.save(),
            followee.save()
        ]);

        res.json({ message: 'Follow counts updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating follow counts', error: error.message });
    }
};

// Get all agents for an experiment
const getAgentsByExperiment = async (req, res) => {
  try {
    const { experimentId } = req.params;
    const agents = await Agent.find({ experimentId });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    updateFollowCounts,
    getAgentsByExperiment
}; 