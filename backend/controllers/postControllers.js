const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

//@desc Get posts
//#route GET /api/posts
//@access Prive
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

//@desc set post
//#route POST /api/postsz
//@access Prive
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }

  const post = await Post.create({
    title: req.body.text,
    description: req.body.description,
    categories: req.body.categories,
    videoLink: req.body.videoLink,
    imageLinks: req.body.imageLinks,
    pdfDownload: req.body.pdfDownload,
    likes: req.body.likes,
  });

  res.status(200).json({ message: post });
});

//@desc Get posts
//#route GET /api/posts
//@access Prive
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

//@desc Get posts
//#route GET /api/posts
//@access Prive
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
};
