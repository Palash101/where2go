import getFirebaseAdmin from './config'

export default async function forgetpassword(req, res) {
    const uid  = req.body.uid;
    const pass  = req.body.pass;
    console.log(pass,'pass in api')
    const firebaseAdmin = getFirebaseAdmin()
    return await firebaseAdmin.auth().updateUser(uid,{
        password:pass
    }).then((user)=>{
        console.log(user,'success result ')
        res.status(200).send({status:'success',user:user.toJSON()})

    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({status:'error',error:err})

    })
  }