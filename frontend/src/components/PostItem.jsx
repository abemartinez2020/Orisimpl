import { deletePost } from "../features/posts/postSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function PostItem({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="post">
      <button
        className="edit"
        onClick={() =>
          navigate("/update", {
            state: {
              post: {
                id: post._id,
                title: post.title,
                description: post.description,
              },
            },
          })
        }
      >
        Edit
      </button>
      <button className="close" onClick={() => dispatch(deletePost(post._id))}>
        x
      </button>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div className="date">
        {new Date(post.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default PostItem;
