import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@joyxcoder/medium-common";
import LabelledInputField from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Signup = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [postInputs, setPosInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(postInputs);

    try {
      const respose = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      localStorage.setItem("token", respose.data.jwt);
      navigate("/posts");
    } catch (error) {
      alert("Error while Signing up!!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <>
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-orange-400 mb-2">
              Create an account
            </h2>
            <p className="text-gray-600 text-lg font-winky">
              Already have an account?{" "}
              <Link
                className="text-yellow-400/50 hover:text-yellow-400 underline font-semibold text-lg"
                to="/signin"
              >
                Login
              </Link>
            </p>
          </div>

          <form className="space-y-10">
            <LabelledInputField
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) =>
                setPosInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
              value={postInputs.name}
            />

            <LabelledInputField
              id="email"
              label="Email"
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) =>
                setPosInputs({
                  ...postInputs,
                  username: e.target.value,
                })
              }
              value={postInputs.username}
            />

            <div>
              <label
                htmlFor="password"
                className="block text-lg capitalize font-winky text-white mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={isPasswordShown ? "text" : "password"}
                  placeholder="Enter your password"
                  value={postInputs.password}
                  onChange={(e) =>
                    setPosInputs({
                      ...postInputs,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 text-lg text-white py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {isPasswordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSignup}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-2xl font-semibold text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200 cursor-pointer uppercase font-winky"
            >
              Sign Up
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default Signup;
