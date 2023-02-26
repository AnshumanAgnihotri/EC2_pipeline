// Material UI
import Box from '@material-ui/core/Box'

// Components
// import Header from '../../shared/Header'

// Styles
import useStyles from './passwordReset.styles'

function ForgotPassword({ children }) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {/* <Header showTermControls={false} /> */}
      <Box className={classes.card}>{children}</Box>
    </Box>
  )
}

export default ForgotPassword
