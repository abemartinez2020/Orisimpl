import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

function UpdatePost() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [post, setPost] = useState({
    title: state.post.title,
    description: state.post.description,
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

    const sanitizedData = {
      title: post.title.trim(),
      description: post.description.trim(),
      image: post.image,
    };
    const postData = { data: sanitizedData, id: state.post.id };
    dispatch(updatePost(postData));
    setPost({ title: "", description: "", image: "" });
    setTimeout(() => navigate("/"), 700);
  };

  return (
    <section
      className="bg-light text-dark  text-center text-sm-center"
      style={{ marginTop: "90px", paddingTop: "100px" }}
    >
      <div className="post-form">
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
            <label htmlFor="image">Change Image</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Update Origami Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UpdatePost;
