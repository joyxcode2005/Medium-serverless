import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Posts from "./pages/Posts";

const App = () => {
  const isauthenticate = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signup"} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/post/:id" element={<Post />} />
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
