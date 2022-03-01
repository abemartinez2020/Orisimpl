const express = require("express");
const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, setPost);
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
