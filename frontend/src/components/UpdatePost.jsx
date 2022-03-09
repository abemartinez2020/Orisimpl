import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postSlice";

function UpdatePost() {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setPost((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title || !post.description) {
      return alert("please fill in the fields");
    }

    const postData = { data: post, id: "6228c5bed7d1e42b903b382c" };
    dispatch(updatePost(postData));
    setPost({ title: "", description: "" });
  };

  return (
    <section className="form">
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
          <button type="submit" className="btn btn-block">
            Update Origami Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default UpdatePost;
