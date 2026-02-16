import { getDatabase, ref, set } from "firebase/database";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

import { app } from "./firebase";
import Signup from "./pages/signup";
import Signin from "./pages/Signin";
const auth=getAuth(app)
const db = getDatabase(app);

const App = () => {

  const putData = () => {
    set(ref(db, "user/pawan"), {
      id: 1,
      name: "pawan verma",
      age: 21,
    });
  };
  const signupUser=(params)=> {
    createUserWithEmailAndPassword(auth,'pawanjalandhara2001@gmail.com','pk1234').then((value)=>console.log(value)
    )
  }


  return (
    <div>
      <h1 className="text-center">Firebase</h1>
       <Signup/>
       <Signin/>
      {/* <button className="bg-black text-white p-1 rounded ml-4 cursor-pointer" onClick={putData}>Put data in Firebase</button> */}
    </div>
  );
};

export default App;
