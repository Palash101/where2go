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
    getCookie
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

export  const emailPasswordSigin = async (email,password)=>{
  const userId = '';
  const userEmail = '';
  const idToken=';'
  console.log(email,'service')
    return signInWithEmailAndPassword(auth,email,password)
      .then( async(userCredentails)=>{

          //User Data
          userId = userCredentails.user.uid;
          userEmail = userCredentails.user.email;
          idToken = await userCredentails.user.getIdToken();

          // await postUserToken(idToken)
          // console.log('created Seesion')
          
          return idToken
      })
      .then(async()=>{
        const adminUser = await getUsersByProvider(userEmail,'email');
        console.log(adminUser ,'admin role')
        if(adminUser.role == 3){
          await createUserSession(idToken,userId,'admin');  
        }
        return {uId:userId,email:userEmail,token:idToken,userType:'admin'}
      })
      .catch((err)=>{
        return{error:'error',message:'something went wrong',deverr:err}
      })

}

const setUser = async(user) =>{
  return await addDoc(collection(db,'users'),user)
.then((data)=>{
    console.log(data,'user data  ')
    return {docId:data.id,success:'success'}
})
.catch((err)=>{
    console.log(err,'Add Category Error Service file')

})
}



export const signinUser = async(user) =>{
  const newUser = await getUsersByProvider(user.uId,'uId');
  console.log(user,'userrr')
  if(newUser.role === 1){
    await createUserSession(user.accessToken,user.uId,'customer');  
  }
  else{
    await setUser({uId:user.uId,phoneNumber:user.phoneNumber,role:1})
    await createUserSession(user.accessToken,user.uId,'customer');  
  }
  return {uId:user.uId,phoneNumber:user.phoneNumber,accessToken:user.accessToken}
} 


 const getUsersByProvider = async (value,provider) => {
  console.log({value:value,provider:provider})
  let profile = "";
  let docsF = await getDocs(
    query(
      collection(db, 'users'),
      where(provider, "==", value),
      limit(1)
    )
  );
  if (docsF.docs.size !== 0) {
    docsF.docs.forEach((doc) => {
      profile = { ...doc.data(), id: doc.id };
    });
  }

  return profile;
};

export const userLogout = async ()=>{
  var path = "/api/logout";
  var url = getApiUrl()+path;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.json();

}

// This function create user session on firebase admin 
// by taking getIdToken() returend from client side login method
// Old function name:  postUserToken


export const  createUserSession = async (token,uId,userType) =>{
  var path = "/api/auth";
  var url = getApiUrl()+path;
  var data = { token: token,uId:uId,userType:userType}
  console.log(data.token,url,'data')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  return response.json();
}


export const  verifyToken = async (cookie) =>{
  var path = "/api/verifyCookie";
 
  var url = getApiUrl()+ path;
  var data = { cookie: cookie }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const getApiUrl = () => {
  console.log(process.env.DEBUG == true)
  if(process.env.DEBUG === true ){
    return process.env.DEV_API
  }
  else{
    return process.env.PROD_API
  }
}


const updatAdminPasswordSendMail = (email)=>{
  sendPasswordResetEmail(auth,email).then((re)=>console.log(res))

}

export const updatAdminPassword = async (uid,password)=>{
  const path = "/api/forgetpassword";
  const url = getApiUrl()+ path;
  console.log(url)
  const data = { uid: uid,pass:password }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();

}