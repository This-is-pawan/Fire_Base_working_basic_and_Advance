import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { app } from "./firebase";

const firestore = getFirestore(app);

const App = () => {
  const [user_data, setuser_data] = useState(null);

  // 🔎 Get document using Query
  const GetDocumentQuery = async () => {
    try {
      const collectionRef = collection(firestore, "users");

      // Correct operator ==
      const q = query(collectionRef, where("isMale", "==", true));

      const snapshot = await getDocs(q);

      snapshot.forEach((docSnap) => {
        console.log("Query Data:", docSnap.data());
        console.log(user_data);
        
        setuser_data(docSnap.data())
      });
    } catch (error) {
      console.log("Query Error:", error);
    }
  };

  // ✍️ Write Data
  const writeData = async () => {
    try {
      const result = await addDoc(collection(firestore, "users"), {
        name: "sham",
        age: 21,
        work:'website',
        isMale:true
      });

      console.log("Write Result:", result.id);
    } catch (err) {
      console.error("Write Error:", err);
    }
  };

  // 📁 Create Subcollection
  const makeSubCollection = async () => {
    try {
      const result = await addDoc(
        collection(firestore, "cities/5fDtvyfBwoemCC7bYrPm/places"),
        {
          name: "place",
          desc: "awesome desc",
          date: Date.now(),
        }
      );

      console.log("Subcollection Write:", result.id);
    } catch (err) {
      console.error("Subcollection Error:", err);
    }
  };

  // 📄 Get Single Document
  const GetDocument = async () => {
    try {
      const ref = doc(
        firestore,
        "cities",
        "5fDtvyfBwoemCC7bYrPm",
        "places",
        "8NYk1G65WAVmW14Wrm0z"
      );

      const snap = await getDoc(ref);

      if (snap.exists()) {
        console.log("Document Data:", snap.data());
        setuser_data(snap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Get Doc Error:", error);
    }
  };

 const updateDoucment=async () => {
  const docRef= doc(firestore,'users','pXYNwxHgnnVywexCT1IU');
 await updateDoc(docRef,{
    name:'sham',
    age:22,
    isMale:true,
    work:'App Developer'
    
  })
 }

 const DeleteDoucment=async () => {
  const docRef= doc(firestore,'users','pXYNwxHgnnVywexCT1IU');
 await deleteDoc(docRef)
 }


  return (
    <div style={{ padding: 20 }}>
      <h1>Firebase Firestore</h1>

      <p>User: {user_data?.name || "No data"}</p>
      <p>age: {user_data?.age || "No data"}</p>
      <p>work: {user_data?.work || "No data"}</p>

      <button onClick={writeData} className="bg-black text-white p-2 m-2 rounded">
        Write Data
      </button>

      <button onClick={makeSubCollection} className="bg-black text-white p-2 m-2 rounded">
        Write Sub Data
      </button>

      <button onClick={GetDocument} className="bg-black text-white p-2 m-2 rounded">
        Get Document
      </button>

      <button onClick={GetDocumentQuery} className="bg-black text-white p-2 m-2 rounded">
        Get By Query
      </button>

       <button onClick={updateDoucment} className="bg-black text-white p-2 m-2 rounded">
        update
      </button>

      
       <button onClick={DeleteDoucment} className="bg-black text-white p-2 m-2 rounded">
        Delete
      </button>
    </div>
  );
};

export default App;
