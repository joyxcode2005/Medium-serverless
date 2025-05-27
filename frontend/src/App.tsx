import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Posts from "./pages/Posts";
import CreateBlog from "./pages/CreateBlog";
import EditPost from "./pages/EditPost";

const App = () => {
  const isauthenticate = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isauthenticate ? (
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
            element={isauthenticate ? <Posts /> : <Navigate to={"/signin"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
