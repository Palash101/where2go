import * as firebaseAdmin from 'firebase-admin/app';

// import { initializeApp } from 'firebase-admin/app';


// get this JSON from the Firebase board
// you can also store the values in environment variables
import * as serviceAccount from '../firebaseAdminServiceTesting.json';

if (!firebaseAdmin.getApps().length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.cert(serviceAccount),
    databaseURL: 'https://where2go-testing.firebaseio.com',
  });
}


export { firebaseAdmin };