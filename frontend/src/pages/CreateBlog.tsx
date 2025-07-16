import React, { useState } from "react";
import ReactQuill from "react-quill";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/v1/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert("✅ Blog created successfully!");
        setTitle("");
        setContent("");
        navigate("/posts");
      } else {
        alert("❌ Error in creating post.");
      }
    } catch (error) {
      alert("❌ Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800">
      <Appbar />
      <div className="max-w-3xl mx-auto px-4 py-8 bg-white dark:bg-slate-800 rounded-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-black dark:text-white">
          Create a New Blog
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xl font-bold mb-1 dark:text-white">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 dark:bg-slate-700 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xl font-bold mb-2 dark:text-white">
              Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your blog content..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
                "link",
                "image",
              ]}
              style={{ height: "300px", marginBottom: "50px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
