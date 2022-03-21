import { useState } from "react";
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
    console.log(post.image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title || !post.description) {
      return alert("please fill in the fields");
    }
    dispatch(createPost(post));
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
          <label htmlFor="image">add Image</label>
          <input
            id="image"
            name="image"
            type="file"
            // value={post.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Origami Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostForm;
