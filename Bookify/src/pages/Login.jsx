import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner3 } from "react-icons/im";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "Login failed";
    }
  };

  useEffect(() => {
    if (firebase?.isLoggedIn) navigate("/");
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await firebase.signinUserWithEmailAndPassword(
        email,
        password
      );
      if (result) {
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await firebase.signinWithGoogle();
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-black p-8 rounded-lg shadow-lg">
        <p className="text-center text-lg font-semibold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🔥 Firebase Tech
        </p>

        <h2 className="m-4 text-center text-2xl font-bold text-white">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 font-semibold text-white hover:bg-indigo-400 disabled:opacity-60"
          >
            {loading ? <ImSpinner3 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-gray-400">
          Create New Account{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Register
          </Link>
        </p>

        <h1 className="text-white text-center m-2">OR</h1>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 disabled:opacity-60"
        >
          {googleLoading ? (
            <ImSpinner3 className="animate-spin" />
          ) : (
            <>
              <FcGoogle size={22} />
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
