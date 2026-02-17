import React, { useState } from "react";
import {
  DeleteDoucment,
  updateDoucment,
  GetDocument,
  makeSubCollection,
  writeData,
  GetDocumentQuery,
  putDataNew,
  GetFromDb,
} from "./pages/Crud";
import { useFirebaseContext } from "./context/Firebase";

const App = () => {
  const [user_data, setuser_data] = useState(null);
  const [name, setName] = useState("");
  const firebase = useFirebaseContext();

  return (
    <div style={{ padding: 20 }}>
      <h1>Firebase Firestore + Realtime DB</h1>

      <p>User: {user_data?.name || "No data"}</p>
      <p>Age: {user_data?.age || "No data"}</p>
      <p>Work: {user_data?.work || "No data"}</p>

      <p>Realtime DB Name: {name?.child?.name || "No data"}</p>

      {/* Firestore Buttons */}
      <button className="bg-black text-white p-2 m-2" onClick={writeData}>Write Data</button>

      <button className="bg-black text-white p-2 m-2" onClick={makeSubCollection}>Write Sub Data</button>

      <button className="bg-black text-white p-2 m-2" onClick={() => GetDocument(setuser_data)}>
        Get Document
      </button>

      <button className="bg-black text-white p-2 m-2" onClick={() => GetDocumentQuery(setuser_data)}>
        Get By Query
      </button>

      <button className="bg-black text-white p-2 m-2" onClick={updateDoucment}>Update</button>

      <button className="bg-black text-white p-2 m-2" onClick={DeleteDoucment}>Delete</button>

      {/* Realtime DB Buttons */}
      <button className="bg-black text-white p-2 m-2" onClick={() => putDataNew(firebase)}>
        Put New Data (Realtime DB)
      </button>

      <button className="bg-black text-white p-2 m-2" onClick={() => GetFromDb(setName)}>
        Get From Realtime DB
      </button>
    </div>
  );
};

export default App;
