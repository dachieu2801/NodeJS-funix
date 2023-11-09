const express = require('express');
const postController = require('../controllers/post');
const router = express.Router();

router.post('/create-post', postController.newPost);
router.get('/post', postController.getPost);
router.delete('/delete-post', postController.deletePost)
router.put('/edit-post', postController.editPost)
router.post('/edit-post', postController.geteditPost)
router.get('/detail/:id', postController.detail)

module.exports = router;
