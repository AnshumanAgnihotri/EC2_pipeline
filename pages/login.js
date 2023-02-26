// Components
import HeadMetadata from '../components/shared/HeadMetadata'
import LoginForm from '../components/login-form'

export default function Login() {
  return (
    <>
      <HeadMetadata metadata={{ title: 'LiFT Learning | Login' }} />
      <LoginForm />
    </>
  )
}
