const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    descripton: String,
    categories: [String],
    videoLink: String,
    imageLinks: [String],
    pdfDownload: String,
    likes: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
