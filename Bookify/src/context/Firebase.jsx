import { createContext, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Create Context
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDq4H7-09CrRi-fk10TXMNywSaqzPyLAzE",
  authDomain: "bookify-e3063.firebaseapp.com",
  projectId: "bookify-e3063",
  storageBucket: "bookify-e3063.firebasestorage.app",
  messagingSenderId: "391679805330",
  appId: "1:391679805330:web:cb12d4f37e2716d64ee34b"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Custom Hook
export const useFirebase = () => useContext(FirebaseContext);

// Provider
export const FirebaseProvider = ({ children }) => {

  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
     
      return userCredential;
    } catch (error) {
      console.error("Signup Error:", error.message);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword }}>
      {children}
    </FirebaseContext.Provider>
  );
};
