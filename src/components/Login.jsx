// src/components/Login.js
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";

const Login = ({ setUser }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <>
    <div className="flex flex-col items-center p-6 mx-auto my-12 max-w-md bg-purple-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        type="email"
        placeholder="Email address"
      />
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        type="password"
        placeholder="Password"
      />

      <div className="flex justify-between items-center w-full mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Remember me
        </label>
        <a href="#!" className="text-blue-500">Forgot password?</a>
      </div>

      <button className="w-full py-3 mb-4 bg-blue-500 text-white rounded-lg">Sign in</button>

      <div className="text-center">
        <p className="mb-2">Not a member? <a href="#!" className="text-blue-500">Register</a></p>
        <p className="mb-4">or sign up with:</p>

        <div className="flex justify-around">
          <button
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
            aria-label="Sign in with Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </button>

          <button
            className="p-2 text-blue-400 hover:bg-blue-100 rounded-full"
            aria-label="Sign in with Twitter"
          >
            <i className="fab fa-twitter"></i>
          </button>

          <button
            className="p-2 text-red-500 hover:bg-red-100 rounded-full"
            aria-label="Sign in with Google"
            onClick={signInWithGoogle}
          >
            <i className="fab fa-google"></i>
          </button>

          <button
            className="p-2 text-gray-800 hover:bg-gray-100 rounded-full"
            aria-label="Sign in with GitHub"
          >
            <i className="fab fa-github"></i>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
