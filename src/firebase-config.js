import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "order-system-85d77.firebaseapp.com",
  projectId: "order-system-85d77",
  storageBucket: "order-system-85d77.firebasestorage.app",
  messagingSenderId: "878681779969",
  appId: "1:878681779969:web:5662bbf17d5c6815533500",
  measurementId: "G-B3296GT4KT",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

