import React, { useEffect, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      setLoading(false);
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setStatus("Loading...");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();

      if (response.ok) {
        const limitedPosts = data.slice(0, 10);
        setPosts(limitedPosts);
        localStorage.setItem("posts", JSON.stringify(limitedPosts));
        setStatus(`Status: ${response.status}`);
      } else {
        setStatus(`Error Status: ${response.status}`);
      }
    } catch (error) {
      setStatus("Network Error");
    }

    setLoading(false);
  };

  const addPost = (title, body) => {
    if (!title || !body) return;

    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title,
      body,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setStatus("Status: 201 (Post Added)");
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setStatus("Status: 200 (Deleted)");
  };

  const deleteAllPosts = () => {
    setPosts([]);
    localStorage.removeItem("posts");
    setStatus("Status: 200 (All Posts Deleted)");
  };

  return (
    <div className="container">
      <h1>Posts from API</h1>

      <PostForm addPost={addPost} />

      <button className="fetch-button" onClick={fetchPosts}>Load Posts</button>
      <button className="delete-all-button" onClick={deleteAllPosts}>Delete All</button>

      {status && <p className="status">{status}</p>}

      {loading ? <p className="loading">Loading...</p> : <PostList posts={posts} deletePost={deletePost} />}
    </div>
  );
};

export default App;
