// import { useSelector, useDispatch } from 'react-redux'
// import queryString from 'querystring'
// import Router from 'next/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import HeadMetadata from '../../../components/shared/HeadMetadata'
import MainLayout from '../../../components/layouts/Main'
//import AuthLegacy from '../../../utils/authLegacy'
//import { isEmptyArray, isEmptyObject } from '../../../utils/utils'

// Utils
import API from '../../../utils/api'
import Auth from '../../../utils/auth'
import { API_ROUTES } from '../../../utils/constants'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function CallBack() {
  const [isSignIn, setIsSignIn] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const valcode = router.query.code
  // const state = router.query.state
 
const loggedinUser = useSelector((state) => state.user)
  const [code, setCode] = useState('')
  //const [message, setMessage] = useState('')
  // useEffect(() => {     
  //     dispatch.user.getUser()
   
  // },[1])
  //const loggedinUser1 = useSelector((state) => state.user)
  
  useEffect(() => {
   
    if (valcode) {
      setCode(valcode)
      callAPI(valcode)
    }
  },[])
  
  async function callAPI(valcode) {


    
    const baseurl = process.env.NEXT_PUBLIC_CLIENT_APP_URL
    const clientid = process.env.NEXT_PUBLIC_EDLINK_CLIENTID
    const sectetKey = process.env.NEXT_PUBLIC_EDLINK_SECRET_KEY
  
  if(valcode !=='')
  {
    const redirecturi = baseurl + 'auth/callback'
    const request = {
      code: valcode,
      client_id: clientid,
      client_secret: sectetKey,
      redirect_uri: redirecturi,
      grant_type: 'authorization_code',
    }
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }
    
    const tokenurl = process.env.NEXT_PUBLIC_EDLINK_TOKEN
    // axios.post will return token and refresh token
    const response = await axios.post(tokenurl, request, config);
    console.log("REsponse==",response)
    
    const ssotoken = response.data.$data.access_token;
    const refresh_token = response.data.$data.refresh_token;
    const expiry = response.data.$data.expires_in;
    // Handle success
    // token Save on local storage
    
    Auth.authenticateEdlinkUser(ssotoken)
    const profile = await axios.get(process.env.NEXT_PUBLIC_EDLINK_PROFILE, {
      headers: {
        Authorization: `Bearer ${ssotoken}`,
      },
    })
    if (!loggedinUser?.email && profile?.data?.$data?.email != '') {
      API.postRequest(API_ROUTES.ssologin, {
        email: profile.data.$data.email.toLowerCase(),
        token: ssotoken,
        refresh_token: refresh_token,
        expiry: expiry
      })
        .then(function (r) {
          // Save on local storage
        
          Auth.authenticateUser(r.data.auth_token)
          setIsSignIn(true)
          toast.success('SSO login successful !', {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
           dispatch.user.getUser()
        })
        .catch(function (error) {
          console.log('SSO error', error.message)
        })
    }
    else if (loggedinUser.email.toLowerCase() === profile.data.$data.email.toLowerCase()) {
      // Request authentication
      API.postRequest(API_ROUTES.ssologin, {
        email: profile.data.$data.email.toLowerCase(),
        token: ssotoken,
      })
        .then(function (r) {
          // Save on local storage
          Auth.authenticateUser(r.data.auth_token)
          setIsSignIn(true)
          toast.success('SSO login successful !', {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          // dispatch.user.getUser()
        })
        .catch(function (error) {
          console.log('SSO error', error.message)
        })
    }
    else
    {
     
      setIsSignIn(true)
      toast.error('SSO email should be same !!', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      // router.push('/login')
      // Auth.deauthenticateUser()
      // AuthLegacy.deauthenticateUser()
      // dispatch({ type: 'RESET_APP' })
    }
  }
}
//const clearErrorMessage = () => setMessage('')
  return (
    <>
    
      {isSignIn ? (
        <>
        <MainLayout>
          <HeadMetadata metadata={{ title: 'Dashboard - LiFT ' }} />
          
        </MainLayout>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
</>
          // 
      ) : ('')
      // (
        
      //   message && (
      //     <Box mt={1}>
      //       <Alert
      //         action={
      //           <IconButton
      //             aria-label="close"
      //             color="inherit"
      //             size="small"
      //             onClick={clearErrorMessage}
      //           >
      //             <CloseIcon fontSize="inherit" />
      //           </IconButton>
      //         }
      //         severity="error"
      //       >
      //         {message}
      //         <button >go to home page</button>
      //       </Alert>
      //     </Box>
      //   )



      // )
      }
         
    </>
  )
}
export default CallBack
