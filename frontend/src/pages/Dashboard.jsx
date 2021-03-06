import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, reset } from "../features/posts/postSlice";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import PostList from "../components/PostList";

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
      navigate("/register");
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
      <section
        className="bg-light text-dark  text-center text-sm-center mt-5 mb-0"
        style={{ paddingTop: "150px", marginBottom: "0px" }}
      >
        <h1>Welcome, {user && user.name}!</h1>
        <p>Your amazing origami posts.</p>
      </section>

      <PostForm />

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="row text-center">
          <h3> You have not posted any origami models.</h3>
        </div>
      )}
    </>
  );
}

export default Dashboard;
