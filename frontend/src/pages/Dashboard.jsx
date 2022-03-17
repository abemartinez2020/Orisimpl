import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, reset } from "../features/posts/postSlice";
import PostForm from "../components/PostForm";
import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isPending, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPosts());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name}!</h1>
        <p>You're amazing origami posts.</p>
      </section>
      <PostForm />

      <section className="content">
        {posts.length > 0 ? (
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>You have not posted any origami models.</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
