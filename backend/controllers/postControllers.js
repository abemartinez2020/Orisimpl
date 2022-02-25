const asyncHandler = require("express-async-handler");
//@desc Get posts
//#route GET /api/posts
//@access Prive
const getPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get them goals!" });
});

//@desc set post
//#route POST /api/postsz
//@access Prive
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }

  res.status(200).json({ message: "Set post." });
});

//@desc Get posts
//#route GET /api/posts
//@access Prive
const updatePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `updating ${req.params.id}` });
});

//@desc Get posts
//#route GET /api/posts
//@access Prive
const deletePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `deleting ${req.params.id}` });
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
};
