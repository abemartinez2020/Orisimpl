import { deletePost } from "../features/posts/postSlice";
import { useDispatch } from "react-redux";

function PostItem({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="post">
      <button className="close" onClick={() => dispatch(deletePost(post._id))}>
        x
      </button>
      <h1>{post.description}</h1>
      <p>{post.description}</p>
      <div className="date">
        {new Date(post.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default PostItem;
