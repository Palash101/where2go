import { serialize } from 'cookie'
// import firebaseAdmin from '../../../service/fireAdmin';  

import getFirebaseAdmin from './config'


export default async function auth(req, res) {
  const firebaseAdmin = getFirebaseAdmin()
  try{
  
    const expiresIn = 5 * 60 * 1000;
    if (req.method === 'POST') {
      var idToken = req.body.token;
      const cookie = firebaseAdmin.auth().verifyIdToken(idToken)
      .then(async (decodedIdToken) => {
      	console.log(decodedIdToken,'decodedIdToken')
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          // Create session cookie and set it.
          return await firebaseAdmin.auth().createSessionCookie(idToken, {expiresIn})
          .then((sessionCookie)=> {
             const options = {maxAge: expiresIn, httpOnly: true, secure: "true", path: '/'};
              console.log('Cookie serialize',serialize('user', sessionCookie, options))
              res.setHeader('Set-Cookie', serialize('user', sessionCookie, options));
              res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }))
          })
          }
          res.status(401).send('Recent sign in required!');
      });
      
    } 
  }
  catch(error){
  	    console.log(error)
  }
 
  }
  