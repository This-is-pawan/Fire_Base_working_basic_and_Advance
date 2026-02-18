import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
 const firebase=useFirebase();
 const navigate=useNavigate()
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email already registered ";

    case "auth/invalid-email":
      return "Invalid email address ";

    case "auth/weak-password":
      return "Password must be at least 6 characters ";

    case "auth/missing-password":
      return "Please enter password ";

    default:
      return "Something went wrong ";
  }
};

 const handleSubmit=async(e) => {
  e.preventDefault()
  
  try {
   const result=await firebase.signupUserWithEmailAndPassword(email,password)
if (result) {
    toast.success("Account created successfully");
    navigate('/')
}
  } catch (error) {
 
  toast.error(getFirebaseErrorMessage(error.code));

  }


 } 

  // console.log(firebase);
  
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-black p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
