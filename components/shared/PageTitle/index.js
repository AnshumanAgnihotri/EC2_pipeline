// Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

// Styles
import useStyles from './pageTitle.styles'

function PageTitle({ text, children }) {
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center" className={classes.container}>
      {children}
      <Typography variant="h5" className={classes.title}>
        {text}
      </Typography>
    </Box>
  )
}

export default PageTitle
