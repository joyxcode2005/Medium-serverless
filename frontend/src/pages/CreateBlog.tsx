import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Title: ", title);
    console.log("Content: ", content);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/post`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("✅ Blog created successfully!");
        setTitle("");
        setContent("");
        navigate("/posts");
      } else {
        alert("❌ Error in creating post!!!");
      }
    } catch (error: any) {
      alert("❌ Error in creating post!!!");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      <Appbar />
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 uppercase text-center">
          Create a New Blog
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-1">Content</label>
            <textarea
              style={{ resize: "none" }}
              className="w-full border border-gray-300 rounded-md p-2 h-80"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your blog content..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 cursor-pointer"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
