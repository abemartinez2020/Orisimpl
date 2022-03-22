import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postSlice";

function PostForm() {
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const imageFile = e.target.files[0];

      if (imageFile.type !== "image/jpeg" && imageFile.type !== "image/png")
        return toast.error("please upload png or jpeg images");

      convert64(imageFile);
    }

    setPost((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const convert64 = (imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = () => {
      setPost((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title || !post.description) {
      return toast.error("please fill in the title and description");
    }

    //sanitize and dispatch payload
    dispatch(
      createPost({
        title: post.title.trim(),
        description: post.description.trim(),
        image: post.image,
      })
    );
    setPost({ title: "", description: "", image: "" });
  };

  return (
    <section className="bg-light text-dark p-5 text-center text-sm-ce mt-5">
      <div className="container mt-5"></div>
      <div className="post-form">
        <h1>Start Posting!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Origami Model Title</label>
            <input
              id="title"
              type=" text"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type=" text"
              value={post.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">add Image</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Add Origami Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostForm;
