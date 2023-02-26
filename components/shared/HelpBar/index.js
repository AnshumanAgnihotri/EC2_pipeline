import { useSelector, useDispatch } from 'react-redux'
// Material UI
import Box from '@material-ui/core/Box'
// Components
import Drawer from '../Drawer'
// Icons
import CloseIcon from '@material-ui/icons/Close'
// styles
import useStyles from './helpBar.styles'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

function HelpBar(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const open = useSelector((state) => state.app.helpBarOpen)
  const setOpen = dispatch.app.changeHelpBarOpen

  const handleClick = () => {
    setOpen(false)
  }

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open={open}
      width={300}
      className={classNames({ [classes.drawerClose]: !open })}
      classes={{
        paper: classNames({ [classes.drawerClose]: !open }),
      }}
    >
      <Box display="flex">
        <Typography variant="h4" className={classes.title}>
          Help
        </Typography>
        <IconButton onClick={handleClick} className={classes.closeIcon}>
          <CloseIcon fontSize="large" color="primary" />
        </IconButton>
      </Box>
      <div className={classes.drawerContainer}>Content</div>
    </Drawer>
  )
}

export default HelpBar
