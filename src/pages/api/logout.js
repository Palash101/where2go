import getFirebaseAdmin from './config';
import { parseCookies } from 'nookies'

export default async function logout(req, res) {

    const cookies =  parseCookies({ req });

    const firebaseAdmin = getFirebaseAdmin()
    const cookie = req.body.token
    console.log(cookie)
    const token = await firebaseAdmin.auth().verifySessionCookie(
        cookies.user)
        .then((decodedClaims) => {
           return firebaseAdmin.auth().revokeRefreshTokens(decodedClaims.sub)
        })
        .then(()=>{
            res.redirect('/');
        })
        .catch(()=>{
            res.redirect('/');
        })
     
       }
       