import { Link } from "react-router-dom";

const Auth = ({ type }: { type: string }) => {
  return (
    <div className="h-screen flex items-center justify-center flex-col pl-15 pr-10">
      <div className="font-bold text-4xl">Create an account</div>
      <p className="font-semibold text-gray-400">
        Already have an account?
        <Link className="underline ml-1" to={"/signin"}>
          Login
        </Link>
      </p>
      <div className="flex flex-col w-[85%] mt-5">
        <label htmlFor="username" className="font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
          className="border-2 border-gray-500 w-[90%] px-4 py-2 placeholder:text-gray-300 placeholder:font-semibold rounded-lg"
        />
      </div>
      <div className="flex flex-col w-[85%] mt-5">
        <label htmlFor="email" className="font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          name="email"
          className="border-2 border-gray-500 w-[90%] px-4 py-2 placeholder:text-gray-300 placeholder:font-semibold rounded-lg"
        />
      </div>
      <div className="flex flex-col w-[85%] mt-5">
        <label htmlFor="username" className="font-bold mb-2">
          Password
        </label>
        <div className="flex items-center border-2 border-gray-500 rounded-lg w-[90%] overflow-hidden">
          <input
            type="password"
            placeholder="Enter your name"
            name="username"
            className="flex-grow px-4 py-2 placeholder:text-gray-300 placeholder:font-semibold outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye-icon text-gray-600 px-4 py-2"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Auth;
