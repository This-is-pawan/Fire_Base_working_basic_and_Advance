import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp, getApps, getApp } from "firebase/app";
import { toast } from "react-toastify";

/* ================= FIREBASE INIT (FIXED) ================= */

const firebaseConfig = {
  apiKey: "AIzaSyDq4H7-09CrRi-fk10TXMNywSaqzPyLAzE",
  authDomain: "bookify-e3063.firebaseapp.com",
  projectId: "bookify-e3063",
  storageBucket: "bookify-e3063.appspot.com",
  messagingSenderId: "391679805330",
  appId: "1:391679805330:web:cb12d4f37e2716d64ee34b",
};

// 🔥 Prevent duplicate app error (VERY IMPORTANT for Vite)
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

/* ================= CONTEXT ================= */

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

/* ================= PROVIDER ================= */

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* -------- Auth State Listener -------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  /* -------- Google Login -------- */
  const googleProvider = new GoogleAuthProvider();
  const signinWithGoogle = () =>
    signInWithPopup(firebaseAuth, googleProvider);

  /* -------- Signup -------- */
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* -------- Signin -------- */
  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* -------- Logout -------- */
  const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* -------- Create Book (Firestore + Storage) -------- */
  const handleCreateNewListing = async (name, isbn, price, coverFile) => {
    try {
      if (!coverFile) return toast.error("Cover image required");

      // Upload image
      const imageRef = ref(
        storage,
        `covers/${Date.now()}_${coverFile.name}`
      );
      await uploadBytes(imageRef, coverFile);

      // Get URL
      const imageURL = await getDownloadURL(imageRef);

      // Save in Firestore
      await addDoc(collection(firestore, "books"), {
        name,
        isbn,
        price,
        coverURL: imageURL,
        userId: user?.uid || null,
        createdAt: new Date(),
      });

      toast.success("Book added successfully 📚");
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* -------- Get All Books -------- */
  const listAllBooks = async () => {
    return await getDocs(collection(firestore, "books"));
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isLoggedIn,
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        logoutUser,
        handleCreateNewListing,
        listAllBooks,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
