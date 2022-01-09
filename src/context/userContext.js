import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const registerUser = async (email, password, name) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name,
        weight: [],
        weightMeasurement: "",
        lastSignInTime: auth.currentUser.metadata.lastSignInTime,
        accountCreated: auth.currentUser.metadata.creationTime,
      });
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      docSnap.exists() && setUserData(docSnap.data());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        lastSignInTime: auth.currentUser.metadata.lastSignInTime,
      });
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      docSnap.exists() && setUserData(docSnap.data());
    } catch (error) {
      setError(error.code);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateWeight = async (weight, weightMeasurement) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        weight: arrayUnion(weight),
        weightMeasurement
      });
    } catch (error) {
      setError(error.code);
    } finally {
      setLoading(false);
    }
  }

  const contextValue = {
    user,
    userData,
    loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
    updateWeight
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
