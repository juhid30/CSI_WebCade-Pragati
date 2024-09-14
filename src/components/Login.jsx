// src/components/Login.js
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

      <button className="w-full py-3 mb-4 bg-blue-500 text-black rounded-lg border-black border">Sign in</button>

      <button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
        </svg>
        Sign in with Google
      </button>

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
