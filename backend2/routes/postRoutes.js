const express = require('express');
const router = express.Router();
const { createPost, updateLikes, updateDislikes } = require('../controllers/postController');

router.post('/', createPost);
router.put('/:id/like', updateLikes);
router.put('/:id/dislike', updateDislikes);

module.exports = router; 