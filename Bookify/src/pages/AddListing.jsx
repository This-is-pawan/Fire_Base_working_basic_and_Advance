import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

const AddListing = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverPic) return alert("Please select cover image");

    setLoading(true);
    await firebase.handleCreateNewListing(
      name,
      isbnNumber,
      price,
      coverPic
    );
    setLoading(false);
    // reset form
    setName("");
    setIsbnNumber("");
    setPrice("");
    setCoverPic(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-black p-8 rounded-lg w-96"
      >
        <input
          type="text"
          required
          placeholder="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
        />

        <input
          type="text"
          required
          placeholder="ISBN Number"
          value={isbnNumber}
          onChange={(e) => setIsbnNumber(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
        />

        <input
          type="number"
          required
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
        />

        {/* 🔥 FIXED FILE INPUT */}
        <input
          type="file"
          required
          onChange={(e) => setCoverPic(e.target.files[0])}
          className="w-full text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 font-semibold text-white hover:bg-indigo-400 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddListing;
