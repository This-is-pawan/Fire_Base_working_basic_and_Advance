import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import { toast } from 'react-toastify'

const Navbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const authenticated = firebase?.isLoggedIn;

  const handleLogout = async () => {
    try {
      await firebase.logoutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-black text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo / Home */}
        <Link to="/" className="text-xl font-semibold hover:text-gray-300">
          Home
        </Link>

        {/* Auth Buttons */}
        {authenticated ? (
         <>
          <Link
            to="/add-listing"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md transition"
          >
           AddListing
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition"
          >
            Logout
          </button>
         </>
        ) : (
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md transition"
          >
            Signup / Signin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
