import 'firebase/auth'
import { parseCookies } from 'nookies'

import getFirebaseAdmin from './config'

async function verifyCookie(req, res) {
  const cookies = parseCookies(req)
  console.log(cookies, 'no cookie')

  const cookie = req.body.cookie
  const admin = getFirebaseAdmin()
  if (!admin) {
    return null
  }
  const token = await admin
    .auth()
    .verifySessionCookie(cookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      const { uid, email, userType } = decodedClaims
      res.status(200).send({ uid, email, userType })
    })
    .catch((err) => {
      console.log('error in verfying cookie', err)
      res.redirect('/')
    })
}

export default verifyCookie
