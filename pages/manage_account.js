import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Layout
import PasswordReset from '../components/layouts/PasswordReset'

// Components
import withAuth from '../hoc/withAuth'
import HeadMetadata from '../components/shared/HeadMetadata'
import ResetPasswordForm from '../components/shared/ResetPasswordForm'

// Utils
import { isEmptyObject } from '../utils/utils'

function ManageAccount() {
  const dispatch = useDispatch()
  const teacher = useSelector((state) => state.user)

  useEffect(() => {
    // Gets user info
    if (isEmptyObject(teacher)) {
      dispatch.user.getUser()
    }
  }, [])

  return (
    <>
      <HeadMetadata metadata={{ title: 'LiFT Learning | Manage Account' }} />
      <PasswordReset>
        <ResetPasswordForm
          title="Manage Account"
          userEmail={teacher.email}
          isAuthenticated={true}
        />
      </PasswordReset>
    </>
  )
}

export default withAuth(ManageAccount)
