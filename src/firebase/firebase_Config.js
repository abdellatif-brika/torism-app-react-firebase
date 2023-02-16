// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDz6YVhs7V0BEpk7Hy-LFudC9y7M8Fo6jI",
  authDomain: "tourisme-app.firebaseapp.com",
  projectId: "tourisme-app",
  storageBucket: "tourisme-app.appspot.com",
  messagingSenderId: "375449688861",
  appId: "1:375449688861:web:a3dad090d00191a8789ff4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export const db =getFirestore(app);
export {auth};

