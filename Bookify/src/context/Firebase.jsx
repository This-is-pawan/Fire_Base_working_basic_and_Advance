import { createContext, useContext,useEffect,useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";

// Create Context
const FirebaseContext = createContext({});

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDq4H7-09CrRi-fk10TXMNywSaqzPyLAzE",
  authDomain: "bookify-e3063.firebaseapp.com",
  projectId: "bookify-e3063",
  storageBucket: "bookify-e3063.firebasestorage.app",
  messagingSenderId: "391679805330",
  appId: "1:391679805330:web:cb12d4f37e2716d64ee34b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// google auth
const googleProvider=new GoogleAuthProvider()
const signinWithGoogle=()=>{
  return signInWithPopup(firebaseAuth,googleProvider)
}
// Custom Hook
export const useFirebase = () => useContext(FirebaseContext);


// Provider
export const FirebaseProvider = ({ children }) => {
  // 
  const [user,setUser]=useState(null)
  useEffect(() => {
onAuthStateChanged(firebaseAuth,user=>{
  if (user) setUser(user);
    else setUser(null);
  
  
})
  }, [])
  // 🔐 Signup
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      toast.error("singup Error:", error.message);
    }
  };

  // 🔐 Signin
  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
       toast.error("sigin Error:", error.message);
    }
  };
  // logout
  const logoutUser = async () => {
  try {
    await signOut(firebaseAuth);
    
  } catch (error) {
    toast.error("Logout Error:", error.message);
    
  }
};

const isLoggedIn=user?true:false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        logoutUser,
        user
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
