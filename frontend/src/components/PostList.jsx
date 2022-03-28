import { useState } from "react";
import PostItem from "./PostItem";

function PostList({ posts }) {
  const [filteredList, setFilteredListe] = useState(posts);

  const handleFilter = (e) => {
    if (e.target.value.length === 0) setFilteredListe(posts);
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredListe(filteredPosts);
  };

  return (
    <section className="p-5">
      <div className="container">
        <div
          className="form-group text-center"
          style={{ width: "50%", margin: "20px auto" }}
        >
          <input type="text" placeholder="search" onChange={handleFilter} />
        </div>
        <div className="row text-center">
          {filteredList.length > 0 ? (
            filteredList.map((post) => <PostItem key={post._id} post={post} />)
          ) : (
            <h2>no post found</h2>
          )}
        </div>
      </div>
    </section>
  );
}

export default PostList;
