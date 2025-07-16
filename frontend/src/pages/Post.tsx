import { useParams } from "react-router-dom";
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
              <div className="h-8 dark:bg-slate-700 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-8 dark:bg-slate-700 bg-gray-200 rounded-lg w-1/2"></div>
            </div>

            {/* Metadata skeleton */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-4 dark:bg-slate-700 bg-gray-200 rounded w-16"></div>
              <div className="h-4 dark:bg-slate-700 bg-gray-200 rounded w-24"></div>
              <div className="h-4 dark:bg-slate-700 bg-gray-200 rounded w-2"></div>
              <div className="h-4 dark:bg-slate-700 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-300" />

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-full"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-full"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-full"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 dark:bg-slate-600 bg-gray-200 rounded w-3/5"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!post) return <div className="text-center mt-10">Post not found.</div>;

  return (
    <div className="w-full min-h-screen dark:bg-slate-800 bg-gray-50">
      <Appbar />
      <div className="max-w-3xl mx-auto px-4 py-12 font-serif text-gray-800">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 dark:text-white">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mb-6 flex justify-between">
          <div>
            <span>
              By{" "}
              <span className="font-medium text-gray-700 dark:text-blue-400">
                {post.author.name}
              </span>
            </span>{" "}
            ·{" "}
            <span className="text-yellow-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>{" "}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Post Content */}
        <div className="prose prose-lg max-w-none dark:text-white">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
