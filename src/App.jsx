import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

import { app } from "./firebase";
const GoogleProvider= new GoogleAuthProvider()

import { useState } from "react";
import { useFirebaseContext } from "./context/Firebase";
const auth=getAuth(app)

const App = () => {

 

  const firebase = useFirebaseContext();
  // console.log("firebase", firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const SingupwithGoogle=()=>{
  signInWithPopup(auth,GoogleProvider)
}
  return (
    <div>
      <h1 className="text-center">Firebase</h1>
     

      {/*  */}

      <h1>Firebase</h1>
      <div className=" w-[550px] border p-6 m-auto bg-black text-white   ">
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-pink-100 p-2 "
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-pink-100 p-2 "
        />
        <br />
        <br />
        <button className="bg-pink-300 p-2 capitalize " onClick={SingupwithGoogle}>Continue With Google</button>
        <br />
        <br />
        <button
          onClick={() => {
            firebase.singupUserWithEmailAndPassword(email, password);
            firebase.putData(`users/${email.replace(/\./g, "_")}`, {
              email: email,
              password: password,
            });
          }}
          className="bg-pink-300 p-2 capitalize "
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default App;
