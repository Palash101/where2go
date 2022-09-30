import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyD7ZaPfDm932IsXBl8lNXNKpYv0e4jYhrg",
    authDomain: "where2go-942e3.firebaseapp.com",
    projectId: "where2go-942e3",
    storageBucket: "where2go-942e3.appspot.com",
    messagingSenderId: "719983054012",
    appId: "1:719983054012:web:dbc257c6c4af5d3607d4b9",
    measurementId: "G-QW6RSHDEMM"
  };


  const firebase = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  export const db = getFirestore(firebase);
  
  export const auth =  getAuth(firebase);
  export const strorage  = getStorage(firebase);


  export default firebase;


//   const firebase = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

//   const db = getFirestore(firebase);
//   const auth =  getAuth(firebase);
//   const storage =  getStorage(firebase);


//  export default {firebase,db,storage,auth};