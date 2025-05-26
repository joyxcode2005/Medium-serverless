import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Appbar from "../components/Appbar";

interface Post {
  title: string;
  authorId: string;
  createdAt: string;
  published: boolean;
  content: string;
  author: {
    name: string;
  };
}

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        });
        setPost(response.data.id); // Fixed: was response.data.id
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            {/* Title skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
            </div>

            {/* Metadata skeleton */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-300" />

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!post) return <div className="text-center mt-10">Post not found.</div>;

  return (
    <div>
      <Appbar />
      <div className="max-w-3xl mx-auto px-4 py-12 font-serif text-gray-800">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mb-6 flex justify-between">
          <div>
            <span>
              By{" "}
              <span className="font-medium text-gray-700">
                {post.author.name}
              </span>
            </span>{" "}
            ·{" "}
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>{" "}
          </div>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Update
          </button>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
