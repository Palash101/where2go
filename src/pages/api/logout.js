import getFirebaseAdmin from './config';

export default async function logout(req, res) {
    const firebaseAdmin = getFirebaseAdmin()
    const cookie = req.cookies.session
    console.log(cookie)
    const token = await firebaseAdmin.auth().verifySessionCookie(
        cookie)
        .then((decodedClaims) => {
           return firebaseAdmin.auth().revokeRefreshTokens(decodedClaims.sub)
        })
        then(()=>{
            res.redirect('/');
        })
        .catch(()=>{
            res.redirect('/');
        })
     
       }
       