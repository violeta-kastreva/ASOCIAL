const db = require('../models');
const EventStream = db['EventStream'];
const eventStreamService = {};
//postservice, comment service, agent service (follow unfollow)

eventStreamService.storeEvent = async ({ experiment_id, timestep, id, type, user_id, post_id, content, image, follower_id, followee_id }) => {
    try {
        const event = await EventStream.create({
            experiment_id: experiment_id,
            timestep: timestep,
            id: id,
            type: type,
            user_id: user_id,
            post_id: post_id,
            content: content,
            image: image,
            follower_id: follower_id,
            followee_id: followee_id
        });
        return event;
    } catch (error) {
        throw error;
    }
}


eventStreamService.applyEvent = async (event) => {
    const { experiment_id, timestep, id, type, user_id, post_id, content, image, follower_id, followee_id } = event;

    if (type === 1) {
        // Create a post
        console.log(`User ${user_id} created a post: ${content}`);
    }
    else if (type === 2) {
        // Comment on a post
        console.log(`User ${user_id} liked post ${post_id}`);
    }
    else if (type === 3) {
        // Like a post
        console.log(`User ${user_id} commented on post ${post_id}: ${content}`);
    }
    else if (type === 4) {
        // Dislike a post
        console.log(`User ${user_id} followed user ${followee_id}`);
    }
    else if (type === 5) {
        // Follow another user
        console.log(`User ${user_id} unfollowed user ${followee_id}`);
    }
    else {
        console.log('Unknown event type');
    }
}

module.exports = eventStreamService;
