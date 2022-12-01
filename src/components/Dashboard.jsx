import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="flex items-center flex-col ">
      <div className="rounded mt-20 bg-[#ffffff55] w-[600px] h-[400px p-12 flex flex-col items-center">
        <h1 className="text-[36px] font-bold">Dashboard</h1>
        <div className="mt-3">Your name: {name}</div>
        <div>Your email adress: {user?.email}</div>
        <div>
          <Link
            to="/"
            className="mt-5 bg-[#ffffff27]  hover:bg-[#ffffff3a] p-3"
          >
            Go back to weather
          </Link>
          <button
            className="mt-5 bg-red-500  hover:bg-red-600 p-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
