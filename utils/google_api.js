// import React from 'react'
// import axios from 'axios'
// import jsrsasign from 'jsrsasign'
// // import srjsr from './jsrsasign.js';
// //const ENV_SERVICE_ACCOUNT_KEY = 'serviceAccountKey'
// //const ENV_JS_RSA_SIGN = 'jsrsasign'
// const ENV_TOKEN_EXPIRES_AT = 'tokenExpiresAt'
// //const ENV_ACCESS_TOKEN = 'accessToken'
// //const baseurl = process.env.NEXT_PUBLIC_CLIENT_APP_URL
// //const JS_RSA_SIGN_SRC = baseurl + 'jsrsasign.js';
// const GOOGLE_OAUTH = 'https://www.googleapis.com/oauth2/v4/token'
// // add/remove your own scopes as needed
// const SCOPES = ['https://www.googleapis.com/auth/drive']

// const EXPIRES_MARGIN = 300 // seconds before expiration
// class GoogleApi {
//   constructor() {
//     this.env = {}
//   }
//   getEnv = (name) => {
//     return this.env[name]
//   }

//   setEnv = (name, value) => {
//     this.env[name] = value
//   }

//   getJWS = (callback) => {
//     console.log(jsrsasign)
//     // debugger;
//     callback(null, jsrsasign.KJUR.jws.JWS)
//   }

//   getJwt = ({ client_email, private_key }, iat, callback) => {
//     this.getJWS((err, JWS) => {
//       // debugger;
//       if (err) return callback(err)

//       const header = {
//         typ: 'JWT',
//         alg: 'RS256',
//       }

//       const exp = iat + 3600
//       const payload = {
//         aud: GOOGLE_OAUTH,
//         iss: client_email,
//         scope: SCOPES.join(' '),
//         iat,
//         exp,
//       }
//       console.log('Calling JWS')
//       //debugger;
//       const jwt = JWS.sign(null, header, payload, private_key)
//       callback(null, jwt, exp)
//     })
//   }

//   getToken = (serviceAccountKey, callback) => {
//     console.log('Getting token')
//     const now = Math.floor(Date.now() / 1000)
//     if (now + EXPIRES_MARGIN < this.getEnv(ENV_TOKEN_EXPIRES_AT)) {
//       //return callback();
//     }

//     console.log('Getting Jwt')
//     this.getJwt(serviceAccountKey, now, (err, jwt, exp) => {
//       if (err) return callback(err)

//       const req = {
//         url: GOOGLE_OAUTH,
//         method: 'POST',
//         header: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: {
//           mode: 'urlencoded',
//           urlencoded: [
//             {
//               key: 'grant_type',
//               value: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
//             },
//             {
//               key: 'assertion',
//               value: jwt,
//             },
//           ],
//         },
//       }

//       const body = {
//         grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
//         assertion: jwt,
//       }

//       var bodyFormData = new FormData()
//       bodyFormData.append(
//         'grant_type',
//         'urn:ietf:params:oauth:grant-type:jwt-bearer'
//       )
//       bodyFormData.append('assertion', jwt)

//       axios
//         .post(req.url, bodyFormData, { headers: req.header })
//         .then((res, err) => {
//           //  console.log("response get from api res ",res);
//           if (err) return callback(err)
//           //console.log("response get from api data",res.data);
//           //console.log("response get from api access_token",res.data.access_token);

//           const accessToken = res.data.access_token
//           // setEnv(ENV_ACCESS_TOKEN, accessToken);
//           // setEnv(ENV_TOKEN_EXPIRES_AT, exp);

//           // console.log("Access token: " + accessToken);
//           callback(null, { accessToken: accessToken, exp: exp })
//         })
//     })
//   }

//   getServiceAccountKey = (afterCallback) => {
//     try {
//       const keyMaterial = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY
//       const serviceAccountKey = JSON.parse(keyMaterial)
//       this.afterGetServiceAccountKey(null, serviceAccountKey, afterCallback)
//     } catch (err) {
//       this.afterGetServiceAccountKey(err)
//     }
//   }

//   afterGetServiceAccountKey = (err, serviceAccountKey, afterCallback) => {
//     if (err) throw err

//     this.getToken(serviceAccountKey, (err, data) => {
//       if (err) {
//         throw err
//         // console.log("ERROR: " + err);
//       } else {
//         afterCallback(data.accessToken, data.exp)
//       }
//     })
//   }
// }

// export default GoogleApi
