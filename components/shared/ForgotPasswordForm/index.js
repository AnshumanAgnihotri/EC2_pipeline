import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import NextLink from 'next/link'

// Material UI
// import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
// import Link from '@material-ui/core/Link'

// Icons
import SendIcon from '@material-ui/icons/Send'

// Styles
// import useStyles from './forgotPasswordForm.styles'

// Validation Schema
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

function SendEmailForm() {
  // const classes = useStyles()
  const dispatch = useDispatch()

  // Data from store
  const feedback = useSelector((state) => state.app.resetPasswordFeedback)

  // Init Formik
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch.app
        .getResetPasswordToken(values)
        .then((response) => {
          dispatch.app.setResetPasswordFeedback({
            type: response.data.success ? 'success' : 'warning',
            message: response.data.message,
          })
          response.data.success && resetForm({})
        })
        .catch((_) => {
          dispatch.app.setResetPasswordFeedback({
            type: 'error',
            message: 'An unexpected error has occurred. Please try again.',
          })
        })
    },
  })

  const handleClose = () =>
    dispatch.app.setResetPasswordFeedback({ type: 'info', message: '' })

  return (
    <form onSubmit={formik.handleSubmit}>
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
                    Customizable, learner - driven technology to teach and
                    assess <strong>mastery of skills</strong> through{' '}
                    <strong>interdisciplinary projects.</strong>
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
                    <h2>Forgot Password?</h2>
                    <p>
                      Enter the email address associated with your account to
                      recover your password. You will receive an email with
                      instructions
                    </p>
                  </div>
                  <div className="login-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Your Email </label>
                          <div className="input-group">
                            <span>
                              <i className="fas fa-envelope"></i>
                            </span>
                            {/* <input type="text" value={formik.values.email}
                              onChange={formik.handleChange}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}
                              className="form-control" placeholder="" /> */}
                            <TextField
                              id="email"
                              placeholder='Enter emailid here'
                              className="form-control"
                              fullWidth
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                              }
                              helperText={
                                formik.touched.email && formik.errors.email
                              }
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
                        <div className="button-group mt-2">
                          <button
                            variant="contained"
                            type="submit"
                            className="btn btn-login"
                            endIcon={<SendIcon />}
                          >
                            Forgot Password
                          </button>
                          {/* <a href="#" className="btn btn-login">Forgot Password</a> */}
                          <div className="forgot-password backLogin">
                            <p>
                              <a href="/login">
                                <span className="material-icons">
                                  arrow_right_alt
                                </span>
                                Back to Login
                              </a>

                              {/* <a href="login.html"><span className="material-icons">arrow_right_alt</span>Back to login</a> */}
                            </p>
                          </div>
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
      <Snackbar
        open={Boolean(feedback.message)}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleClose} severity={feedback.type}>
          {feedback.message}
        </MuiAlert>
      </Snackbar>
    </form>
    // <form onSubmit={formik.handleSubmit}>
    //   <Typography variant="h1" className={classes.title}>
    //     Reset your password
    //   </Typography>
    //   <Typography variant="body1" className={classes.bodyText}>
    //     {`We'll send you a link to reset your password.`}
    //   </Typography>
    //   <TextField
    //     id="email"
    //     className={classes.input}
    //     fullWidth
    //     label="Enter your email address"
    //     placeholder="example@mylift.io"
    //     variant="outlined"
    //     value={formik.values.email}
    //     onChange={formik.handleChange}
    //     error={formik.touched.email && Boolean(formik.errors.email)}
    //     helperText={formik.touched.email && formik.errors.email}
    //   />
    //   <Box
    //     mt={2}
    //     display="flex"
    //     justifyContent="space-between"
    //     alignItems="center"
    //   >
    //     <NextLink href="/login">
    //       <a>
    //         <Link>
    //           <strong>Back to Login</strong>
    //         </Link>
    //       </a>
    //     </NextLink>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       type="submit"
    //       endIcon={<SendIcon />}
    //     >
    //       Send
    //     </Button>
    //   </Box>

    //   <Snackbar
    //     open={Boolean(feedback.message)}
    //     autoHideDuration={6000}
    //     onClose={handleClose}
    //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    //   >
    //     <MuiAlert onClose={handleClose} severity={feedback.type}>
    //       {feedback.message}
    //     </MuiAlert>
    //   </Snackbar>
    // </form>
  )
}

export default SendEmailForm
