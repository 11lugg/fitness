import React, { useEffect, useState, useRef } from "react";
import { useUserContext } from "../context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import WeightList from "./weightList";
import Error from "./error";

const Dashboard = () => {
  const weightRef = useRef();
  const weightMeasurementRef = useRef();
  const { user, loading, logoutUser, updateWeight } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

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

  const onSubmit = (e) => {
    e.preventDefault();
    const weight = weightRef.current.value;
    const weightMeasurement = weightMeasurementRef.current.value;
    if (weight && weightMeasurement) updateWeight(weight, weightMeasurement);
  };

  const listItems = userData?.weight.map((number) => (
    <WeightList key={number.toString()} value={number} />
  ));

  return (
    <div id="dashboard">
      {error && <Error error={error} />}
      <h1>Dashboard </h1>
      <h2>Name: {userData?.name}</h2>
      <h2>Email: {user.email}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input placeholder="Enter weight" type="text" ref={weightRef} />
          <select ref={weightMeasurementRef}>
            <option
              selected={userData?.weightMeasurement === "lbs"}
              value="lbs"
            >
              lbs
            </option>
            <option selected={userData?.weightMeasurement === "kg"} value="kg">
              kg
            </option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
      <ul>{listItems}</ul>
      <button onClick={logoutUser}>Log out</button>
    </div>
  );
};

export default Dashboard;
