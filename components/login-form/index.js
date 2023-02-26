import { useState } from 'react'
import Router from 'next/router'
import NextLink from 'next/link'
// import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
// import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
// import Card from '@material-ui/core/Card'
// import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
// import GoogleApi from '../../utils/google_api.js'
// import axios from 'axios'

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CloseIcon from '@material-ui/icons/Close'

// Utils
import API from '../../utils/api'
import Auth from '../../utils/auth'
import AuthLegacy from '../../utils/authLegacy'
import { API_ROUTES } from '../../utils/constants'

// Styles
// import useStyles from './loginForm.styles'

export default function LoginForm() {
  // added by satan

  // const classes = useStyles()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  // const [isOpen,setIsOpen] = useState(false);
  const [signIn, setSignIn] = useState(false)
  const [message, setMessage] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const clearCredentials = () => {
    setCredentials({
      username: '',
      password: '',
    })
  }

  const handleSignIn = (e) => {
    e.preventDefault()

    setSignIn(true)

    // Request authentication
    API.postRequest(API_ROUTES.login, {
      email: credentials.username,
      password: credentials.password,
    })
      .then(function (response) {
        // Handle success
        // Save on local storage
        Auth.authenticateUser(response.data.auth_token)
        // Authenticate in the legacy application
        AuthLegacy.authenticateUser(credentials.username, credentials.password)
        // Clean up form values
        clearCredentials()
        setSignIn(false)
        setMessage('')
        Router.push('/')
      })
      .catch(function (error) {
        // Handle error
        // Clean local storage
        Auth.deauthenticateUser()
        // Set error message
        setSignIn(false)
        setMessage(error.response.data.message)
      })
  }

  // const googleapi = new GoogleApi()

  //   function generateRandomNo(length) {
  //     var result           = '';
  //     var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  //     var charactersLength = characters.length;
  //     for ( var i = 0; i < length; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() *
  //  charactersLength));
  //    }
  //    return result;
  // }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown)
  }
  function ssoGoogleLogin() {
    // googleapi.getServiceAccountKey((accessToken, expiry) => {
    const stateID = Auth.generateRandomNo(64)
    const baseurl = process.env.NEXT_PUBLIC_CLIENT_APP_URL
    const clientid = process.env.NEXT_PUBLIC_EDLINK_CLIENTID
    const redirecturi = baseurl + 'auth/callback'

    const edlinkurl = process.env.NEXT_PUBLIC_EDLINK_LOGIN

    const url = `${edlinkurl}?client_id=${clientid}&redirect_uri=${redirecturi}&state=${stateID}&response_type=code`
    window.location = url
    // })
  }
  const cleverLogin = () => {
    const url = `https://clever.com/oauth/authorize?client_id=e4c0821b1c950d4201d5&redirect_uri=https://liftstaging.mylift.io/auth/clever/callback&response_type=code`;
    console.log('url',url)
    window.location = url
  }
  const clearErrorMessage = () => setMessage('')
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  return (
    <section className="login-wrapper">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10">
            <div className="login-box">
              <div className="login-slide-left">
                <span className="login-logo">
                  <img
                    src="/images/login-logo.png"
                    className="img-fluid"
                    alt=""
                  />
                </span>
                <p>
                  Customizable, learner - driven technology to teach and assess{' '}
                  <strong>mastery of skills</strong> through{' '}
                  <strong>interdisciplinary projects.</strong>
                  <div style={{display:'none'}}>v1</div>
                </p>
              </div>
              <div className="login-slide-right">
                <div className="message-box">
                  <span
                    className="alert alert-danger"
                    style={{ display: 'none' }}
                  >
                    The user credentials are incorrect.
                  </span>
                  <span
                    className="alert alert-success"
                    style={{ display: 'none' }}
                  >
                    Login Successfully!
                  </span>
                </div>
                <div className="login-head">
                  <span>Welcome!</span>
                  <h2>To Lift Learning</h2>
                </div>
                <div className="login-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Username </label>
                        <div className="input-group">
                          <span>
                            <i className="fas fa-envelope"></i>
                          </span>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={credentials.username}
                            onChange={handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        <span
                          className="error-message text-danger"
                          style={{ display: 'none' }}
                        >
                          Please enter your email-id.
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Password</label>
                        <div className="input-group password-field">
                          <span>
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type={passwordShown ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            name="password"
                            required
                            className="form-control"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder=""
                          />
                          <span
                            className="hide-password"
                            onClick={togglePassword}
                          ></span>
                        </div>

                        <span
                          className="error-message text-danger"
                          style={{ display: 'none' }}
                        >
                          Please enter your password.
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="button-group mt-2">
                        {/* <a href="index.html" className="btn btn-login">Sign In</a> */}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className="btn btn-login"
                          onClick={handleSignIn}
                          disabled={
                            signIn ||
                            !credentials.username ||
                            !credentials.password
                          }
                        >
                          {signIn ? 'Processing ...' : 'Sign In'}
                        </Button>
                        {message && (
                          <Box mt={1}>
                            <Alert
                              action={
                                <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  size="small"
                                  onClick={clearErrorMessage}
                                >
                                  <CloseIcon fontSize="inherit" />
                                </IconButton>
                              }
                              severity="error"
                            >
                              {message}
                            </Alert>
                          </Box>
                        )}
                        <div className="forgot-password">
                          <p>
                            Forgot your password?
                            <NextLink href="/forgot_password">
                              <a>
                                Reset here
                                <span className="material-icons">
                                  arrow_right_alt
                                </span>
                              </a>
                            </NextLink>
                            {/* <a href="forgot-password.html">Reset here<span className="material-icons">arrow_right_alt</span></a> */}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="button-group">
                        <Link className="btn btn-login clever-color" 
                         onClick={cleverLogin}
                        >
                          <span>
                            <img
                              src="/images/icon-5.png"
                              className="img-fluid"
                              alt=""
                            />
                          </span>
                          Login with Clever
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="other-login">
                        <h4>Login With </h4>
                        <ul>
                          {/* <li><a href="#"><span><img src="images/icon-1.png" className="img-fluid" alt="" /></span></a></li>
											<li><a href="#"><span><img src="images/icon-2.png" className="img-fluid" alt="" /></span></a></li>
											<li><a href="#"><span><img src="images/icon-3.png" className="img-fluid" alt="" /></span></a></li>
											<li><a href="#"><span><img src="images/icon-4.png" className="img-fluid" alt="" /></span></a></li>
                                    */}
                          <li>
                            {' '}
                            <Link
                              className="img-fluid"
                              onClick={ssoGoogleLogin}
                            >
                              <span>
                                <img
                                  src="/images/icon-1.png"
                                  className="img-fluid"
                                  alt=""
                                />
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              title="Log in with Canvas"
                              className="sso-login-btn sso-icon canvas"
                            >
                              <span>
                                <img
                                  src="/images/icon-2.png"
                                  className="img-fluid"
                                  alt=""
                                />
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              title="Log in with Schoology"
                              className="sso-login-btn sso-icon schoology"
                            >
                              <span>
                                <img
                                  src="/images/icon-3.png"
                                  className="img-fluid"
                                  alt=""
                                />
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              title="Log in with Microsoft"
                              className="sso-login-btn sso-icon microsoft"
                            >
                              <span>
                                <img
                                  src="/images/icon-4.png"
                                  className="img-fluid"
                                  alt=""
                                />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <main className={classes.mainContainer}>
    //   <Card square={false} elevation={8}>
    //     <Grid container alignItems="center">
    //       <Grid item xs={12} sm={6}>
    //         <div className={classes.imageContainer}>
    //           <img
    //             src="/images/signinBranding.png"
    //             alt="LiFT Learning"
    //             className={classes.image}
    //           />
    //         </div>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <div className={classes.paper}>
    //           <Avatar className={classes.avatar}>
    //             <LockOutlinedIcon />
    //           </Avatar>
    //           <Typography component="h1" variant="h5" className={classes.title}>
    //             Welcome to LiFT Learning
    //           </Typography>
    //           <form className={classes.form}>
    //             <TextField
    //               variant="outlined"
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="username"
    //               label="Username"
    //               name="username"
    //               autoComplete="username"
    //               autoFocus
    //               value={credentials.username}
    //               onChange={handleChange}
    //             />
    //             <TextField
    //               variant="outlined"
    //               margin="normal"
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="current-password"
    //               value={credentials.password}
    //               onChange={handleChange}
    //             />
    //             <Box display="flex" justifyContent="center" mt={2}>
    //               <NextLink href="/forgot_password">
    //                 <a className={classes.forgotPasswordLink}>
    //                   Forgot your password?
    //                 </a>
    //               </NextLink>
    //             </Box>
    //             <Button
    //               type="submit"
    //               fullWidth
    //               variant="contained"
    //               color="primary"
    //               className={classes.submit}
    //               onClick={handleSignIn}
    //               disabled={
    //                 signIn || !credentials.username || !credentials.password
    //               }
    //             >
    //               {signIn ? 'Processing ...' : 'Sign In'}
    //             </Button>

    //             {message && (
    //               <Box mt={1}>
    //                 <Alert
    //                   action={
    //                     <IconButton
    //                       aria-label="close"
    //                       color="inherit"
    //                       size="small"
    //                       onClick={clearErrorMessage}
    //                     >
    //                       <CloseIcon fontSize="inherit" />
    //                     </IconButton>
    //                   }
    //                   severity="error"
    //                 >
    //                   {message}
    //                 </Alert>
    //               </Box>
    //             )}

    //             <div className="sso-icon-bar">
    //               <Button
    //                 title="Log in with Google"
    //                 className="sso-login-btn sso-icon google"
    //                 onClick={ssoGoogleLogin}
    //               ></Button>

    //               <Button
    //                 title="Log in with Canvas"
    //                 className="sso-login-btn sso-icon canvas"
    //               ></Button>
    //               <Button
    //                 title="Log in with Schoology"
    //                 className="sso-login-btn sso-icon schoology"
    //               ></Button>
    //               <Button
    //                 title="Log in with Microsoft"
    //                 className="sso-login-btn sso-icon microsoft"
    //               ></Button>
    //             </div>

    //           </form>
    //         </div>
    //       </Grid>
    //     </Grid>
    //   </Card>
    //   <Box mt={3}>
    //     <Typography variant="body1" color="textSecondary" align="center">
    //       To learn more about LiFT and how to sign up, please visit{' '}
    //       <Link
    //         href="https://liftlearning.com/"
    //         rel="noopener noreferrer"
    //         target="_blank"
    //       >
    //         liftlearning.com
    //       </Link>
    //       . ©{new Date().getFullYear()} LiFT Learning™. All Rights Reserved.
    //     </Typography>
    //   </Box>
    // </main>
  )
}
