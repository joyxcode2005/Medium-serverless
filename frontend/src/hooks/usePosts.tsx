import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.blogs);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    }

    fetchPosts();
  }, []);

  return { posts, isLoading };
};

export default useFetchPosts;
