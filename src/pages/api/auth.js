import { serialize } from 'cookie'
// import firebaseAdmin from '../../../service/fireAdmin';  

import getFirebaseAdmin from './config'


export default async function auth(req, res) {
  const firebaseAdmin = getFirebaseAdmin()
  try{
  
    const expiresIn = 5 * 60 * 1000;
    if (req.method === 'POST') {
      var idToken = req.body.token;
      console.log(idToken,'idToken in api')

      const cookie = firebaseAdmin.auth().verifyIdToken(idToken)
      .then(async (decodedIdToken) => {
      	console.log(decodedIdToken,'decodedIdToken')
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
        console.log(firebaseAdmin.auth().createSessionCookie(idToken, {expiresIn}),'adasdadadadsadaadsasd')
          // Create session cookie and set it.
          return await firebaseAdmin.auth().createSessionCookie(idToken, {expiresIn});
          }

          res.status(401).send('Recent sign in required!');
      });

    if(cookie) {
      console.log('auth cookie',cookie)
      // console.log("secure:" + process.env.NEXT_PUBLIC_SECURE_COOKIE);
        const options = {maxAge: expiresIn, httpOnly: true, secure: "true", path: '/'};
        res.setHeader('Set-Cookie', serialize('user', cookie, options));
        res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }))
    } else {
      res.status(401).send('Invalid authentication');
    }
      
    } 
  }
  catch(error){
  	    console.log(error)
  }
 
  }
  