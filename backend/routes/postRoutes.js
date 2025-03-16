const express = require('express');
const router = express.Router();
const { createPost, updateLikes, updateDislikes, getPostsByExperiment, getPostComments } = require('../controllers/postController');

router.post('/', createPost);
router.put('/:id/like', updateLikes);
router.put('/:id/dislike', updateDislikes);
router.get('/experiment/:experimentId', getPostsByExperiment);
router.get('/:id/comments', getPostComments);

module.exports = router; 