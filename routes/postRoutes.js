const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "❌ Delete failed" });
  }
});
const { getPosts, createPost } = require('../controllers/postController');
router.get('/', getPosts);
router.post('/', createPost);
module.exports = router;
