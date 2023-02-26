import { useState } from 'react'
import NextLink from 'next/link'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import * as yup from 'yup'

// Material UI
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Link from '@material-ui/core/Link'
import SendIcon from '@material-ui/icons/Send'
// Components
import Loader from '../Loader'

// Icons
import UpdateIcon from '@material-ui/icons/Update'
import HelpIcon from '@material-ui/icons/Help'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

// Styles
import useStyles from './resetPasswordForm.styles'

// Validation Schema
const validationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$/,
      'Password requires at least one number and one letter.'
    ),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
})

function ResetPassword({
  title,
  userEmail,
  isAuthenticated,
  token = null,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoading = useSelector((state) => state.loading.global)
  const feedback = useSelector((state) => state.app.resetPasswordFeedback)
  const disabled = isLoading || !userEmail
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const handleMouseDownPassword = (event) => event.preventDefault()
  const handleToggleShowPassword = () => setShowPassword(!showPassword)
  const handleToggleShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm)

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (token || isAuthenticated) {
        dispatch.app
          .resetPassword({
            isAuthenticated: isAuthenticated,
            params: { password: values.password, token: token },
          })
          .then((response) => {
            dispatch.app.setResetPasswordFeedback({
              type: response.data.success ? 'success' : 'warning',
              message: response.data.message,
            })
            response.data.success && resetForm({})
          })
      }
    },
  })

  const handleClose = () =>
    dispatch.app.setResetPasswordFeedback({ type: 'info', message: '' })

  return (

    <>
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
                    <h2>Reset Password ?</h2>
                    <p>
                      Enter the email address associated with your account to
                      recover your password. You will receive an email with
                      instructions
                    </p>
                  </div>
                  <div className="login-form">
                    <form onSubmit={formik.handleSubmit}>
                      {isLoading && <Loader />}
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-gorup">
                            <TextField
                              id="email"
                              fullWidth
                              disabled={true}
                              placeholder=""
                              variant="outlined"
                              name="email"
                              value={userEmail}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-gorup">
                            <TextField
                              id="password"
                              fullWidth
                              type={showPassword ? 'text' : 'password'}
                              placeholder="New Password"
                              variant="outlined"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                              }
                              helperText={
                                formik.touched.password && formik.errors.password
                              }
                              disabled={disabled}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleToggleShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-gorup">
                            <TextField
                              id="password-confirm"
                              fullWidth
                              type={showPasswordConfirm ? 'text' : 'password'}
                              placeholder="Confirm New Password"
                              variant="outlined"
                              name="passwordConfirm"
                              value={formik.values.passwordConfirm}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.passwordConfirm &&
                                Boolean(formik.errors.passwordConfirm)
                              }
                              helperText={
                                formik.touched.passwordConfirm &&
                                formik.errors.passwordConfirm
                              }
                              disabled={disabled}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleToggleShowPasswordConfirm}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPasswordConfirm ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="noteText">
                        <span>
                          <i className="fas fa-question-circle"></i>
                        </span>
                        Password must be at least eight characters and have at least one
                        number and one letter
                      </div>

                      <div className="col-lg-12 button-group mt-4">
                        <button
                          type="button"
                          className="smallbtn btn-black btn-close"
                          onClick={() => router.push('/')}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-custom"
                          type="submit"
                          variant="contained"
                          disabled={disabled}
                        >
                          Reset Password
                        </button>
                      </div>

                      {/* Feedback Message */}
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
    </>
    // <form onSubmit={formik.handleSubmit}>
    //   {isLoading && <Loader />}
    //   <Typography variant="h1" className={classes.title}>
    //     {title}
    //   </Typography>
    //   <Typography variant="body1" className={classes.bodyText}>
    //     <strong>Email:</strong> {userEmail}
    //   </Typography>
    //   <TextField
    //     id="password"
    //     className={classes.input}
    //     fullWidth
    //     type={showPassword ? 'text' : 'password'}
    //     label="Password"
    //     placeholder=""
    //     variant="outlined"
    //     name="password"
    //     value={formik.values.password}
    //     onChange={formik.handleChange}
    //     error={formik.touched.password && Boolean(formik.errors.password)}
    //     helperText={formik.touched.password && formik.errors.password}
    //     disabled={disabled}
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           <IconButton
    //             aria-label="toggle password visibility"
    //             onClick={handleToggleShowPassword}
    //             onMouseDown={handleMouseDownPassword}
    //           >
    //             {showPassword ? <Visibility /> : <VisibilityOff />}
    //           </IconButton>
    //         </InputAdornment>
    //       ),
    //     }}
    //   />
    //   <TextField
    //     id="password-confirm"
    //     className={classes.input}
    //     fullWidth
    //     type={showPasswordConfirm ? 'text' : 'password'}
    //     label="Password confirmation"
    //     placeholder=""
    //     variant="outlined"
    //     name="passwordConfirm"
    //     value={formik.values.passwordConfirm}
    //     onChange={formik.handleChange}
    //     error={
    //       formik.touched.passwordConfirm &&
    //       Boolean(formik.errors.passwordConfirm)
    //     }
    //     helperText={
    //       formik.touched.passwordConfirm && formik.errors.passwordConfirm
    //     }
    //     disabled={disabled}
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           <IconButton
    //             aria-label="toggle password visibility"
    //             onClick={handleToggleShowPasswordConfirm}
    //             onMouseDown={handleMouseDownPassword}
    //           >
    //             {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
    //           </IconButton>
    //         </InputAdornment>
    //       ),
    //     }}
    //   />
    //   <Box mt={2} display="flex" alignItems="flex-start">
    //     <HelpIcon fontSize="small" className={classes.helpTextIcon} />
    //     <Typography variant="body1" className={classes.helpText}>
    //       Password must be at least eight characters and have at least one
    //       number and one letter
    //     </Typography>
    //   </Box>
    //   {!isLoading && !userEmail && (
    //     <Box mt={2}>
    //       <MuiAlert severity="info">
    //         Token provided invalid or expired. Click{' '}
    //         <NextLink href="/forgot_password">
    //           <Link className={classes.link}>
    //             <strong>here</strong>
    //           </Link>
    //         </NextLink>{' '}
    //         to get a new one.
    //       </MuiAlert>
    //     </Box>
    //   )}
    //   <Box
    //     mt={2}
    //     display="flex"
    //     justifyContent="space-between"
    //     alignItems="center"
    //   >
    //     {token ? (
    //       <NextLink href="/login">
    //         <Link className={classes.link}>
    //           <strong>Back to Login</strong>
    //         </Link>
    //       </NextLink>
    //     ) : (
    //       <Link className={classes.link} onClick={() => router.back()}>
    //         <strong>Back</strong>
    //       </Link>
    //     )}
    //     <Button
    //       type="submit"
    //       variant="contained"
    //       color="primary"
    //       disabled={disabled}
    //       endIcon={<UpdateIcon />}
    //     >
    //       Reset Password
    //     </Button>
    //   </Box>

    //   {/* Feedback Message */}
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

export default ResetPassword
