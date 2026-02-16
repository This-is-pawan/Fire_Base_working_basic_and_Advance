import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState(null);
  const [isSignin, setIsSignin] = useState(false); // toggle signup/signin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= GOOGLE ================= */
  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ================= EMAIL SIGNUP ================= */
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  /* ================= EMAIL SIGNIN ================= */
  const handleSignin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signin Successful");
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      alert("Wrong password");
    } else if (error.code === "auth/user-not-found") {
      alert("User not found. Please signup first.");
    } else if (error.code === "auth/invalid-credential") {
      alert("This email is linked with Google. Please login with Google.");
    } else {
      alert(error.message);
    }
  }
};


  /* ================= AUTH STATE ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  /* ================= AUTH PAGE ================= */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-[380px]">

          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
            {isSignin ? "Signin" : "Signup"}
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={isSignin ? handleSignin : handleSignup}
            className="w-full bg-blue-600 text-white p-2 rounded mb-3"
          >
            {isSignin ? "Signin" : "Create Account"}
          </button>

          {/* GOOGLE */}
          <button
            onClick={signupWithGoogle}
            className="w-full border p-2 rounded mb-3"
          >
            Continue with Google
          </button>

          {/* TOGGLE */}
          <p className="text-sm text-center">
            {isSignin ? "Don't have account?" : "Already have account?"}
            <span
              className="text-blue-600 cursor-pointer ml-1"
              onClick={() => setIsSignin(!isSignin)}
            >
              {isSignin ? "Signup" : "Signin"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-xl font-bold mb-2">Dashboard</h1>
        <p className="mb-4">{user.email}</p>

        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
