// Layout
import PasswordReset from '../components/layouts/PasswordReset'

// Components
import HeadMetadata from '../components/shared/HeadMetadata'
import ForgotPasswordForm from '../components/shared/ForgotPasswordForm'

export default function Login() {
  return (
    <>
      <HeadMetadata metadata={{ title: 'LiFT Learning | Forgot Password' }} />
      {/* <PasswordReset> */}
        <ForgotPasswordForm />
      {/* </PasswordReset> */}
    </>
  )
}
