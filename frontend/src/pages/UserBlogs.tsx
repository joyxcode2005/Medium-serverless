import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author: {
    name: string;
  };
};

export default function UserBlogsPage() {
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const config = {
          method: "get" as const,
          maxBodyLength: Infinity,
          url: `${BACKEND_URL}/api/v1/post/user-bluk`, // Fixed typo: user-bluk -> user-bulk
          headers: {
            Authorization: `Bearer ${token}`, // Use dynamic token instead of hardcoded one
          },
        };

        const response = await axios.request(config);
        setUserBlogs(response.data.user_blogs || []);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        setError("Failed to load your blogs. Please try again.");

        // Handle authentication errors
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [token, navigate]);

  // Fixed: Added return statement for loading state
  if (loading) {
    return (
      <>
        <Appbar />
        <div className="p-6 max-w-5xl mx-auto">
          <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            <div className="flex items-center w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[400px]">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[440px]">
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[360px]">
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Appbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center uppercase">
          Your Blogs
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {userBlogs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              You haven't created any blogs yet.
            </p>
            <button
              onClick={() => navigate("/create")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userBlogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 flex justify-between items-start hover:shadow-md transition"
              >
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-xs text-gray-400">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      By: {blog.author.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/post/${blog.id}`)}
                    className="px-3 py-2 text-sm cursor-pointer text-blue-600 hover:bg-blue-50 rounded-md transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${blog.id}`)}
                    className="flex items-center gap-2 cursor-pointer px-3 py-2 border bg-yellow-500 border-gray-300 text-white rounded-md text-sm hover:bg-yellow-400 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
