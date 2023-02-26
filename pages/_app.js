import { useEffect } from 'react'
import App from 'next/app'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// Store
import store from '../utils/store'

import theme from '../utils/theme'
// import '../styles/globals.scss'

// CSS

//import 'slick-carousel/slick/slick.css'
//import 'slick-carousel/slick/slick-theme.css'
// custom
// import '//pro.fontawesome.com/releases/v5.10.0/css/all.css';

// import './common/css/bootstrap.min.css'
// import './common/css/style.css'

import './css/all.css'
import './css/bootstrap.min.css'
import './css/style.css'


function MyApp(props) {
  const { Component, pageProps } = props
  /* 
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  */

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp
