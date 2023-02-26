import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

// Layout


// Components
import HeadMetadata from '../../components/shared/HeadMetadata'
import ResetPassword from '../../components/shared/ResetPassword'

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
        <ResetPassword
          title="Choose a New Password"
          userEmail={userEmail}
          isAuthenticated={false}
          token={router.query.token}
        />
    </>
  )
}
