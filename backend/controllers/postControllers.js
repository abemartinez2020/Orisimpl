const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
// const User = require("../models/userModel");
const { cloudinary } = require("../utils/cloudinary");

//@desc Get posts
//#route GET /api/posts
//@access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

//@desc set post
//#route POST /api/postsz
//@access Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400);
    throw new Error("Please fill title and description.");
  }

  const imageFileString = req.body.image;
  const uploadResponse = await cloudinary.uploader.upload(imageFileString, {
    upload_preset: "orisimpl",
  });

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    image: { url: uploadResponse.url, public_id: uploadResponse.public_id },
    user: req.user.id,
  });

  res.status(200).json(post);
});

//@desc Get posts
//#route GET /api/posts
//@access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  let data;
  const { title, description } = req.body;

  if (req.body.image) {
    await cloudinary.uploader.destroy(post.image.public_id);
    const imageFileString = req.body.image;
    const uploadResponse = await cloudinary.uploader.upload(imageFileString, {
      upload_preset: "orisimpl",
    });

    data = {
      title,
      description,
      image: { url: uploadResponse.url, public_id: uploadResponse.public_id },
    };
  } else {
    data = { title, description, image: post.image };
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

//@desc Get posts
//#route GET /api/posts
//@access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await cloudinary.uploader.destroy(post.image.public_id);
  await post.remove();
  console.log(deletePost);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
};
