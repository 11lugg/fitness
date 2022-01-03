import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "fitness-dev-fcd45.firebaseapp.com",
  projectId: "fitness-dev-fcd45",
  storageBucket: "fitness-dev-fcd45.appspot.com",
  messagingSenderId: "693943055808",
  appId: "1:693943055808:web:5b8f5c7f615704fa64c425"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);