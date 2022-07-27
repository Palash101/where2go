import 'firebase/auth';

import getFirebaseAdmin from './config'

export async function verifyCookie(req,res){
    const cookie = req.body.cookie
    const admin =  getFirebaseAdmin();
    if(!admin){
      return null;
    }
      const token = await admin.auth().verifySessionCookie(
       cookie, true /** checkRevoked */)
       .then((decodedClaims) => {
        const { uid, email, userType } = decodedClaims;
        res.status(200).send({uid,email, userType})

       })
       .catch(err=>{
        console.log('error in verfying cookie',err)
        res.redirect('/');
       })
    
      }
      

export default verifyCookie
