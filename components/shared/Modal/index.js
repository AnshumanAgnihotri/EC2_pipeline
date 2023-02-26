import { useSelector } from 'react-redux'

// Material UI
import Paper from '@material-ui/core/Paper'
import ModalMaterialUI from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// Components
import Loader from '../Loader'

// Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

// styles
import useStyles from './modal.styles'

function Modal(props) {
  const classes = useStyles()
  const isLoading = useSelector((state) => state.loading.global)

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <ModalMaterialUI
      {...props}
      className={classes.evidenceModal}
      onClick={handleClick}
    >
      <Paper className={classes.modalPaper}>
        <Box
          position="absolute"
          margin={-2}
          right={60}
          className={classes.closeButton}
        >
          <Tooltip title="Close modal">
            <IconButton onClick={props.onClose}>
              <HighlightOffIcon fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
        {isLoading && <Loader />}
        {props.children}
      </Paper>
    </ModalMaterialUI>
  )
}

export default Modal
