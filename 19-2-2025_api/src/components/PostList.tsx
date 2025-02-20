import React from "react";
import { Post } from "../types/Post";

interface PostListProps {
    posts: Post[];
    deletePost: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, deletePost }) => {
    return (
        <ul className="post-list">
            {posts.map((post) => (
                <li key={post.id} className="post-item">
                    <div>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </div>
                    <button className="delete-button" onClick={() => deletePost(post.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default PostList;
