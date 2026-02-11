import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfhloOrl4oz15R2Pio22OjorQx6ueAsnU",
  authDomain: "event-14a16.firebaseapp.com",
  projectId: "event-14a16",
  storageBucket: "event-14a16.firebasestorage.app",
  messagingSenderId: "444626312473",
  appId: "1:444626312473:web:cd37b26b4b20905286b988",
  measurementId: "G-241Q5JHHDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);