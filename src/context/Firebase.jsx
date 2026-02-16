import React, { createContext, useContext } from "react";
const FirebaseContext = createContext(null);
export const useFirebaseContext = () => useContext(FirebaseContext);

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { app } from "../firebase";

const database = getDatabase(app);
const firebaseAuth = getAuth(app);

export const FirebaseProvider = ({ children }) => {
  
  /* ================= SIGNUP ================= */
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  /* ================= LOGIN ================= */
  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  /* ================= PUT DATA ================= */
  const putData = (key, data) => {
    return set(ref(database, key), data);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        putData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
