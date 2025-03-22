const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    publishPost
} = require('../controllers/postController');

// All routes are protected
router.use(auth);

// Post CRUD operations
router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

// Post publishing
router.post('/:id/publish', publishPost);

module.exports = router; 