import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv6G313PtHsNvcubLA8e6WXCsy3Gm1uR0",
  authDomain: "aetheriai.firebaseapp.com",
  projectId: "aetheriai",
  storageBucket: "aetheriai.firebasestorage.app",
  messagingSenderId: "65622251209",
  appId: "1:65622251209:web:1079beef77d54ab64adf18",
  measurementId: "G-6SZ8EBM475",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
