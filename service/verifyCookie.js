import 'firebase/auth';
import getFirebaseAdmin from '../src/pages/api/config';


async function verifyCookie(cookie) { 
const admin = await getFirebaseAdmin();
if(!admin){
  return null;
}

var usermail = "";
var bAuth = false;
  await admin.auth().verifySessionCookie(
   cookie, true /** checkRevoked */)
    .then((decodedClaims) => {
        console.log('decodedClaims',decodedClaims)
      bAuth = true;
      usermail = decodedClaims.email;
    })
    .catch((err) => {
        console.log(err,'cookie verification failed')
      // Session cookie is unavailable or invalid. Force user to login.
      bAuth = false;
    });

    return {
        authenticated: bAuth,
        usermail: usermail
    }
  }
  

  export default verifyCookie