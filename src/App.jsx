import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { app } from "./firebase";
import Signup from "./pages/signup";
import Signin from "./pages/Signin";
import { useFirebaseContext } from "./context/Firebase";
import { useState } from "react";
// const auth=getAuth(app)
// const db = getDatabase(app);

const App = () => {
  // const putData = () => {
  //   set(ref(db, "user/pawan"), {
  //     id: 1,
  //     name: "pawan verma",
  //     age: 21,
  //   });
  // };
  // const signupUser=(params)=> {
  //   createUserWithEmailAndPassword(auth,'pawanjalandhara2001@gmail.com','pk1234').then((value)=>console.log(value)
  //   )
  // }

  const firebase = useFirebaseContext();
  // console.log("firebase", firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1 className="text-center">Firebase</h1>
      {/* <Signup/>
       <Signin/> */}
      {/* <button className="bg-black text-white p-1 rounded ml-4 cursor-pointer" onClick={putData}>Put data in Firebase</button> */}

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
