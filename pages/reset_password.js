import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

// Layout
import PasswordReset from '../components/layouts/PasswordReset'

// Components
import HeadMetadata from '../components/shared/HeadMetadata'
import ResetPasswordForm from '../components/shared/ResetPasswordForm'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    if (router.query.token) {
      dispatch.app.verifyResetToken(router.query.token).then((response) => {
        if (response.data.success) setUserEmail(response.data.data.user.email)
      })
    }
  }, [])

  return (
    <>
      <HeadMetadata metadata={{ title: 'LiFT Learning | Reset Password' }} />
      <PasswordReset>
        <ResetPasswordForm
          title="Choose a New Password"
          userEmail={userEmail}
          isAuthenticated={false}
          token={router.query.token}
        />
      </PasswordReset>
    </>
  )
}
