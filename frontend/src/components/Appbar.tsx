import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

const Appbar = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");

  useEffect(() => {
    // Sync <html> class with mode on initial load and whenever it changes
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleCreateBlog = () => {
    navigate("/create");
  };

  return (
    <div className="w-full h-[10vh] border-b border-slate-700 flex items-center justify-between p-8 pb-12 dark:bg-slate-800 bg-white">
      <h2 className="text-4xl font-semibold uppercase flex">
        <img src="/logo.png" alt="logo" width={50} />
        <Link to={"/posts"} className="flex flex-col justify-center ml-2 dark:text-white text-black">
          Noted <br /> <span className="text-lg -mt-2">Blogging Online</span>
        </Link>
      </h2>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={toggleMode}
          className="text-2xl transition-colors duration-300"
        >
          {mode === "dark" ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </button>

        <Link to={"/user-blogs"}>
          <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-10 h-10 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleCreateBlog}
          className="text-black border border-black font-medium rounded-lg text-sm px-5 py-2 ml-2 cursor-pointer dark:text-white dark:border-white"
        >
          + Create
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2 ml-2 cursor-pointer dark:bg-red-600 dark:hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Appbar;
