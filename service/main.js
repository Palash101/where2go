import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore,initializeFirestore } from "firebase/firestore";
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

  const firebaseConfigTesting = {
    apiKey: "AIzaSyBPux-gjGeKT74-_XB760P07HYhTIIDfQw",
    authDomain: "where2go-testing.firebaseapp.com",
    projectId: "where2go-testing",
    storageBucket: "where2go-testing.appspot.com",
    messagingSenderId: "517698017414",
    appId: "1:517698017414:web:60e6d4ccf5d9bc999d9907",
    measurementId: "G-NNYVLRQBVE"
  };


  const firebase = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  initializeFirestore(firebase, {
    ignoreUndefinedProperties: true,
  });
  export const db = getFirestore(firebase);
  
  export const auth =  getAuth(firebase);
  export const strorage  = getStorage(firebase);


  export default firebase;


//   const firebase = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

//   const db = getFirestore(firebase);
//   const auth =  getAuth(firebase);
//   const storage =  getStorage(firebase);


//  export default {firebase,db,storage,auth};