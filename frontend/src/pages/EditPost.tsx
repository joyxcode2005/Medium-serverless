import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Appbar from "../components/Appbar";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPostData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const post = response.data.id;
          setTitle(post.title);
          setContent(post.content);
        } else {
          alert("❌ Error fetching post data!");
        }
      } catch (error) {
        alert("❌ Error fetching post data!");
      }
    };
    fetchPostData();
  }, [id]);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/post`,
        {
          id,
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("✅ Post updated successfully!");
        setTitle("");
        setContent("");
        navigate("/posts");
      } else {
        alert("❌ Error updating post!");
      }
    } catch (error) {
      alert("❌ Error updating post!");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 uppercase text-center">
          Edit Blog Post
        </h1>
        <form>
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
            onClick={handlePostUpdate}
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
