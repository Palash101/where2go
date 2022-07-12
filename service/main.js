import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD7ZaPfDm932IsXBl8lNXNKpYv0e4jYhrg",
    authDomain: "where2go-942e3.firebaseapp.com",
    projectId: "where2go-942e3",
    storageBucket: "where2go-942e3.appspot.com",
    messagingSenderId: "719983054012",
    appId: "1:719983054012:web:dbc257c6c4af5d3607d4b9",
    measurementId: "G-QW6RSHDEMM"
  };

  const firebase  = initializeApp(firebaseConfig);
  export const db = getFirestore();
  export const auth =  getAuth();


  export default firebase;