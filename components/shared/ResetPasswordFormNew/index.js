import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import * as yup from 'yup'

// Material UI
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

// Components
import Loader from '../Loader'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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

function ResetPasswordForm({
  title,
  userEmail,
  isAuthenticated,
  token = null,
}) {
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
      {isLoading && <Loader />}
      <div className="top-wrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-wrap custom-head-wrap">
                <h2>Account Management</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 filter-wrap account-setting mt-2">
            <form onSubmit={formik.handleSubmit}>
            
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
    </>
  )
}

export default ResetPasswordForm
