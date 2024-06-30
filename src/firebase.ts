import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDtRPWWHuv28iklrjj8XgG-FeNq1oSyX-c",
  authDomain: "tiktoks-of-my-wife.firebaseapp.com",
  projectId: "tiktoks-of-my-wife",
  storageBucket: "tiktoks-of-my-wife.appspot.com",
  messagingSenderId: "1012702838608",
  appId: "1:1012702838608:web:9bd43ff94d3944e9d97655",
  measurementId: "G-MMJ4J9MJR0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
