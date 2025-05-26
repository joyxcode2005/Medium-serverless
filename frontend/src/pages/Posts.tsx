import Appbar from "../components/Appbar";
import BlogPost from "../components/BlogPost";
import useFetchPosts from "../hooks/usePosts";

const Posts = () => {
  const { posts, isLoading } = useFetchPosts();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Appbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Skeleton for multiple blog posts */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                role="status"
                className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse"
              >
                {/* Post header skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Author avatar skeleton */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      {/* Author name skeleton */}
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      {/* Date skeleton */}
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>

                {/* Title skeleton */}
                <div className="mb-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>

                {/* Action buttons skeleton */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-12"></div>
                </div>

                <span className="sr-only">Loading post {index + 1}...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  interface Post {
    id: string;
    title: string;
    author: {
      name: string;
    };
    content: string;
    createdAt: string;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Appbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {posts.map((post: Post, index) => (
            <BlogPost
              id={post.id}
              key={post.id || index}
              author={post.author.name}
              content={post.content}
              title={post.title}
              date={post.createdAt.split("T")[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
