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

export  const emailPasswordSigin = (email,password)=>{
  const userId = '';
  const userEmail = '';
  console.log(email,'service')
    return signInWithEmailAndPassword(auth,email,password)
      .then((userCredentails)=>{
          console.log(userCredentails,'Service User Credentials')
          userId = userCredentails.user.uid;
          userEmail = userCredentails.user.email;
          return userCredentails.user.getIdToken();

      })
      .then((idtoken)=>{
        console.log('idtoken',idtoken)
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