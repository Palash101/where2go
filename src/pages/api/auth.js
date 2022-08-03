import { serialize } from 'cookie'
// import firebaseAdmin from '../../../service/fireAdmin';  

import getFirebaseAdmin from './config'


export default async function auth(req, res) {
  const firebaseAdmin = getFirebaseAdmin()
  try{
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    if (req.method === 'POST') {
      var idToken = req.body.token;
      const userType = req.body.userType;
      const uId = req.body.uId;
      

      const cookie = firebaseAdmin.auth().verifyIdToken(idToken)
      .then(async (decodedIdToken) => {
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 60 * 60 * 24 * 5 * 1000) {

          // Create session cookie and set it.
          await createUserClaims(uId,userType)
          return await firebaseAdmin.auth().createSessionCookie(idToken, {expiresIn})
          .then((sessionCookie)=> {

             const options = {maxAge: expiresIn, httpOnly: true, secure: "true", path: '/'};
              res.setHeader('Set-Cookie', serialize('user', sessionCookie, options));
              // .setCustomUserClaims(uid, { admin: true })
              res.status(200).end(JSON.stringify({ success:'success', message: 'Succesfull logged in' }))
          })
          }
          res.status(401).send('Recent sign in required!');
      });    
    } 
  }
  catch(error){
    console.log(error)
    res.status(401).send({error:'error',message:error});
  }

  }

  const createUserClaims = async (uId,userType)=>{
    const firebaseAdmin = getFirebaseAdmin()
    console.log('calling claims',uId)

    return await firebaseAdmin.auth().setCustomUserClaims(uId, { userType: userType }).
    then((res)=>{
      return res
    })


  }
  