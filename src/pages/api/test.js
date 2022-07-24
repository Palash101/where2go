import getFirebaseAdmin from './config'
const axios = require('axios');

const db = getFirebaseAdmin().firestore()

export default async function test(req,res){
    try{
        axios
        .post('https://europe-west3-smart-footwear-sport.cloudfunctions.net/paitentSms-1', {
          phone: '+91722490178',
          message:'hello from project'
        },
        )
        .then(res => {
          console.log(`statusCode: ${res.status}`);
          console.log(res);
        })
        .catch(error => {
          console.error(error);
        });
        

        }
       
    catch(error){
        console.log(error)
        res.status(500).send({status:'error',error:error})
    }
    

 

}