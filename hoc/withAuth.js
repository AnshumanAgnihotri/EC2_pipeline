import { useRouter } from 'next/router'

// Utils
import Auth from '../utils/auth'

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter()
      const isAuthenticated = Auth.isUserAuthenticated()

      // If there is no access token we redirect to "/" page.
      if (!isAuthenticated) {
        Router.replace('/login')
        return null
      }

      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />
    }

    // If we are on server, return null
    return null
  }
}

export default withAuth
