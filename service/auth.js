import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    getAuth,
  } from "firebase/auth";

  import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    where,
  } from "firebase/firestore";

import {auth,db} from './main'
import {firebaseAdmin} from './fireAdmin';  

export  const emailPasswordSigin = (email,password)=>{
  const userId = '';
  const userEmail = '';
  const idToken=';'
  console.log(email,'service')
    return signInWithEmailAndPassword(auth,email,password)
      .then( async(userCredentails)=>{
          const expiresIn = 5 * 60 * 1000;
          userId = userCredentails.user.uid;
          userEmail = userCredentails.user.email;
          idToken = await userCredentails.user.getIdToken();

          //Firebase Admin session
          await postUserToken(idToken)
          console.log('created Seesion')
          return idToken

      })
      .then((idtoken)=>{
        return getUsersByEmail(userEmail);
      })
      .catch(err=> {console.log(err)})

}

const getUsersByEmail = async (email) => {
  console.log('calling get user by email')
  let profile = "";
  let docsF = await getDocs(
    query(
      collection(db, 'users'),
      where("email", "==", email),
      limit(1)
    )
  );
  if (docsF.docs.size !== 0) {
    docsF.docs.forEach((doc) => {
      console.log(doc,'Users Doc')
      profile = { ...doc.data(), id: doc.id };
    });
  }

  return profile;
};

export const userLogout = ()=>{
  signOut(auth);
}

export const  postUserToken = async (token) =>{
  var path = "/api/auth";
  var url = 'http://localhost:3000' + path;
  var data = { token: token }
  console.log(data,'api call')
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}