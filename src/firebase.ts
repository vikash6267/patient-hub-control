import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDDSNiiWroynWYyfwMOspKcFGxXG4zfkGo",
  authDomain: "varn-ecom.firebaseapp.com",
  projectId: "varn-ecom",
  storageBucket: "varn-ecom.firebasestorage.app",
  messagingSenderId: "900213556938",
  appId: "1:900213556938:web:b68f862078b579fdf61633",
  measurementId: "G-Q3PY0BVSS8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
