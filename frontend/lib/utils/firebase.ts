import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "doclock-bef33.firebaseapp.com",
  projectId: "doclock-bef33",
  storageBucket: "doclock-bef33.firebasestorage.app",
  messagingSenderId: "46808600541",
  appId: "1:46808600541:web:5d8141681f3a24d52db034"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);