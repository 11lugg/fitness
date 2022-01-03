import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Dashboard = () => {
  const { user, loading, logoutUser } = useUserContext();
  const [ userData, setUserData ] = useState(null);
  const [ error, setError ] = useState("");

  useEffect(() => {
    if (userData) return;
    getUserData();
  }, [loading]);

  const getUserData = async () => {
        try {
          const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
          docSnap.exists() && setUserData(docSnap.data());
        } catch (error) {
          setError(error.message);
        }
  };

  return (
    <div>
      <h1>Dashboard </h1>
      <h2>Name : { userData && userData.name}</h2>
      <h2>Email : {user.email}</h2>
      <button onClick={logoutUser}>Log out</button>
    </div>
  );
};

export default Dashboard;
