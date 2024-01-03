
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB3RRmIRS4yGhfuPgP4MsKMiqbn81NBoCk",
  authDomain: "samflix-cc96c.firebaseapp.com",
  projectId: "samflix-cc96c",
  storageBucket: "samflix-cc96c.appspot.com",
  messagingSenderId: "790833799802",
  appId: "1:790833799802:web:ce946f6218a54e43e691c3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);