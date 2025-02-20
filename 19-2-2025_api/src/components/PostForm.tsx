import React, { useState } from "react";

interface PostFormProps {
    addPost: (title: string, body: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !body) {
            alert("Title and Body cannot be empty!");
            return;
        }
        addPost(title, body);
        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
            <button type="submit" className="add-button">Add Post</button>
        </form>
    );
};

export default PostForm;
