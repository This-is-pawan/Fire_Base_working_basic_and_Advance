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
  deleteDoc,
} from "firebase/firestore";
import { app } from "../firebase";

const firestore = getFirestore(app);

// 🔎 Get document using Query
export const GetDocumentQuery = async (setuser_data) => {
  try {
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("isMale", "==", true));
    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {
      console.log("Query Data:", docSnap.data());
      setuser_data(docSnap.data());
    });
  } catch (error) {
    console.log("Query Error:", error);
  }
};

// ✍️ Write Data
export const writeData = async () => {
  await addDoc(collection(firestore, "users"), {
    name: "sham",
    age: 21,
    work: "website",
    isMale: true,
  });
};

// 📁 Subcollection
export const makeSubCollection = async () => {
  await addDoc(
    collection(firestore, "cities/5fDtvyfBwoemCC7bYrPm/places"),
    {
      name: "place",
      desc: "awesome desc",
      date: Date.now(),
    }
  );
};

// 📄 Get Single Document
export const GetDocument = async (setuser_data) => {
  const ref = doc(
    firestore,
    "cities",
    "5fDtvyfBwoemCC7bYrPm",
    "places",
    "8NYk1G65WAVmW14Wrm0z"
  );

  const snap = await getDoc(ref);

  if (snap.exists()) {
    setuser_data(snap.data());
  }
};

// ✏️ Update
export const updateDoucment = async () => {
  const docRef = doc(firestore, "users", "pXYNwxHgnnVywexCT1IU");
  await updateDoc(docRef, {
    name: "sham",
    age: 22,
    isMale: true,
    work: "App Developer",
  });
};

// 🗑 Delete
export const DeleteDoucment = async () => {
  const docRef = doc(firestore, "users", "pXYNwxHgnnVywexCT1IU");
  await deleteDoc(docRef);
};
