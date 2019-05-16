const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middlewares/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.json({ errors: errors.array() });

      const user = await User.findById(req.user.id).select('-password');

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:post_id
// @desc    Get single post by id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: "Post doesn't exist" });

    // check if the user own the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/likes/:id
// @desc    Likes a post
// @access  Private
router.put('/likes/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post already like by a user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Remove a like
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post already like by a user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'post has not yet been liked' });
    }

    // Get the remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.json({ errors: errors.array() });

      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment from the post
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    ); // Either comment or false
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });

    // Check if the user is the one that created the comment
    if (comment.user.toString() !== req.user.id) return res.sendStatus(401);

    // Find the index of the comment in the array and remvoe it
    const commentIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(commentIndex, 1);
    res.json(post.comments);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
