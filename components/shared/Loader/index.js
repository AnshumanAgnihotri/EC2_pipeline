// Material UI
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

// Styles
import useStyles from './loader.styles'

function Loader() {
  const classes = useStyles()

  return (
    <div className='custom-loader' open>
      {/* <CircularProgress color="inherit" /> */}
      <i className="fas fa-circle-notch fa-spin"></i>
    </div>
  )
}

export default Loader
