import 'firebase/auth';

import getFirebaseAdmin from './config'

export async function verifyCookie(req,res){
    const cookie = req.body.cookie
    console.log(cookie, 'cookie in main api call verif token')
    const admin = await getFirebaseAdmin();
    console.log(!admin,'checking admin')
    if(!admin){
      console.log('admin not fount')
      return null;
    }
      const token = await admin.auth().verifySessionCookie(
       cookie, true /** checkRevoked */)
       .then((decodedClaims) => {
        const { uid, email } = decodedClaims;
        res.status(200).send({uid,email})

       })
       .catch(err=>{
        res.status(401).send({error:err})
       })
    
      }
      

export default verifyCookie
