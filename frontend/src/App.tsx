import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Posts from "./pages/Posts";
import CreateBlog from "./pages/CreateBlog";
import EditPost from "./pages/EditPost";
import { useEffect, useState } from "react";

const App = () => {
  const [isauthenticated, setIsauthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsauthenticated(Boolean(localStorage.getItem("token")));
    };


    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isauthenticated ? (
                <Navigate to={"/posts"} />
              ) : (
                <Navigate to={"/signup"} />
              )
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route
            path="/posts"
            element={isauthenticated ? <Posts /> : <Navigate to={"/signin"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
