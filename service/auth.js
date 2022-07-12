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

import {auth} from './main'

  export  const emailPasswordSigin = (email,password)=>{
    console.log(email,'service')
      signInWithEmailAndPassword(auth,email,password)
            .then((userCredentails)=>{
                console.log(userCredentails,'Service User Credentials')
                userId = userCredential.user.uid;
                userEmail = userCredential.user.email;

                return userCredential.user.getIdToken();

            })
            .catch((err)=>console.log(err))


  }