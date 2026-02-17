import React, { useState } from "react";
import {
  DeleteDoucment,
  updateDoucment,
  GetDocument,
  makeSubCollection,
  writeData,
  GetDocumentQuery,
} from "./pages/Crud";

const App = () => {
  const [user_data, setuser_data] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Firebase Firestore</h1>

      <p>User: {user_data?.name || "No data"}</p>
      <p>Age: {user_data?.age || "No data"}</p>
      <p>Work: {user_data?.work || "No data"}</p>

      <button className="bg-black text-white p-2 m-2 rounded" onClick={writeData}>Write Data</button>

      <button className="bg-black text-white p-2 m-2 rounded" onClick={makeSubCollection}>Write Sub Data</button>

      <button className="bg-black text-white p-2 m-2 rounded" onClick={() => GetDocument(setuser_data)}>
        Get Document
      </button>

      <button className="bg-black text-white p-2 m-2 rounded" onClick={() => GetDocumentQuery(setuser_data)}>
        Get By Query
      </button>

      <button className="bg-black text-white p-2 m-2 rounded" onClick={updateDoucment}>Update</button>

      <button className="bg-black text-white p-2 m-2 rounded" onClick={DeleteDoucment}>Delete</button>
    </div>
  );
};

export default App;
