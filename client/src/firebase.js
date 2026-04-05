import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJKjMlEQfZwrt1dmwj6lXAcnARgCHzUhM",
  authDomain: "proconnect-e1d93.firebaseapp.com",
  projectId: "proconnect-e1d93",
  storageBucket: "proconnect-e1d93.firebasestorage.app",
  messagingSenderId: "417240324848",
  appId: "1:417240324848:web:4ccf18ef0fc88f5beac035",
  measurementId: "G-PHSST1ZDQR"
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();