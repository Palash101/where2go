var admin = require("firebase-admin");
var serviceAccount = require("../../../firebaseAdminService.json");

function getFirebaseAdmin() {
if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:'https://where2go-942e3.firebaseio.com'
    });
}
return admin;
}

export default getFirebaseAdmin;