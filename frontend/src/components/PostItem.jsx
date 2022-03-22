import { deletePost } from "../features/posts/postSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function PostItem({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="col-md gap-2">
      <div className="card bg-light text-dark mt-3">
        <div className="card-body text-center w-fill">
          <img
            src={post.image.url}
            style={{ width: "100%" }}
            alt=""
            className="card-image"
          />
          <h3 className="card-title mb-3">{post.title}</h3>
          <p className="card-text">{post.description}</p>

          <div className="date">
            {new Date(post.createdAt).toLocaleString("en-US")}
          </div>
          <button
            className="btn mt-3"
            onClick={() =>
              navigate("/update", {
                state: {
                  post: {
                    id: post._id,
                    title: post.title,
                    description: post.description,
                    imagePublicId: post.image.public_id,
                  },
                },
              })
            }
          >
            Edit
          </button>
          <button
            className="btn bg-secondary mt-3 ms-5"
            onClick={() => dispatch(deletePost(post._id))}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
