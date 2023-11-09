const Post = require('../models/post');


exports.newPost = async (req, res, next) => {
  try {
    const post = new Post(req.body)
    await post.save()
    res.json({ status: 'oke' })
  } catch (err) {
    res.status(400).json({ status: 'false', message: err.message })
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.find({})
    res.json({ status: 'oke', value: posts })
  } catch (err) {
    res.status(400).json({ status: 'false', message: err.message })
  }
};  

exports.deletePost = async (req, res, next) => {
  const id = req.body.id
  console.log(id);
  try {
    await Post.findByIdAndRemove(id)
    res.json({ status: 'oke' })

  } catch (err) {
    res.status(400).json({ status: 'false', message: err.message })
  }
};

exports.geteditPost = async (req, res, next) => {
  const id = req.body.id
  try {
    const post = await Post.findById(id)
    console.log(post);
    res.json({ status: 'oke', value: post })

  } catch (err) {
    res.status(400).json({ status: 'false', message: err.message })
  }
};

exports.editPost = async (req, res, next) => {
  const id = req.body.id
  try {
    const post = await Post.findById(id)
    post.title = req.body.title
    post.image = req.body.image
    post.content = req.body.content
    await post.save()
    res.json({ status: 'oke' })

  } catch (err) {
    res.status(400).json({ status: 'false', message: err.message })
  }
};

exports.detail = async (req, res, next) => {
  const id = req.params.id
  console.log(id);
  try {
    const post = await Post.findById(id)
    res.json({ status: 'oke', value: post })

  } catch (err) {
    res.status(400).json({ status: 'false', message: err.message })
  }
};