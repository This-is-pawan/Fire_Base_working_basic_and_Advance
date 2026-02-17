import React, { useState,useEffect } from 'react'
import { getFirestore, collection, addDoc ,doc,getDoc,} from 'firebase/firestore'
import { app } from './firebase'

const firestore = getFirestore(app);

const App = () => {
const [user_data,setuser_data]=useState('')
  const writeData = async () => {
    try {
      const result = await addDoc(collection(firestore, 'cities'), {
        name: 'Delhi',
        pincode: 1234,
        lat: 123,
        long: 456,
      });
setuser_data(result)
      console.log('result', result);
    } catch (err) {
      console.error('Error:', err);
    }
  }
   const makeSubCollection= async () => {
    try {
      const result = await addDoc(collection(firestore, 'cities/5fDtvyfBwoemCC7bYrPm/places'), {
        name: 'place',
       desc:'awsm desc',
       date:Date.now()
      });

      console.log('result', result);
    } catch (err) {
      console.error('Error:', err);
    }
  }
const GetDocument = async () => {
  try {
    const ref = doc(
      firestore,
      'cities',
      '5fDtvyfBwoemCC7bYrPm',
      'places',
      '8NYk1G65WAVmW14Wrm0z'
    );

    console.log("Doc Ref:", ref);

    const snap = await getDoc(ref);
    if (snap.exists()) {
      console.log("Document Data:", snap.data());
            setuser_data(snap.data());

    } else {
      console.log("No such document found!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
};

useEffect(() => {
GetDocument()
}, [])

  return (
    <div>
      <h1>Firebase Firestore</h1>
        <p>user: {user_data?.name}</p>
      <p>desc: {user_data?.desc}</p>
      <p>date: {user_data?.date}</p>
      <button onClick={writeData} className='bg-black text-white p-2 m-2 rounded'>
        Write Data
      </button>
      <button onClick={makeSubCollection} className='bg-black text-white p-2 m-2 rounded'>
        Write sub-data
      </button>
         <button onClick={GetDocument} className='bg-black text-white p-2 m-2 rounded'>
       Get-document
      </button>
    </div>
  )
}

export default App
