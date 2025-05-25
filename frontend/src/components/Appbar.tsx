import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token")
    navigate("/signin");
  };

  return (
    <div className="w-screen h-[10vh] border-b-1 border-slate-700 flex items-center justify-between p-4">
      <h2 className="text-4xl font-semibold uppercase">Noted</h2>
      <div className="flex">
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <button
          type="button"
          onClick={handlelogout}
          className="focus:outline-none text-white bg-red-700  font-medium rounded-lg text-sm px-5 py-2 flex items-center justify-center ml-2 cursor-pointer dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Appbar;
