import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
// Material UI
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
// components
import Drawer from '../Drawer'
// icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
// styles
import useStyles from './evidencePreviewPane.styles'

function EvidencePreviewPane(props) {
  const classes = useStyles()
  const open = useSelector((state) => state.app.evidencePaneOpen)
  const setOpen = useDispatch().app.changeEvidencePaneOpen

  const closeEvidencePane = () => {
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      variant="permanent"
      anchor="bottom"
      width="unset"
      className={classNames(classes.drawer, {
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: classNames(classes.paper, {
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Box display="flex">
        <Typography variant="h5" className={classes.title}>
          Preview Student name - Evidence name
        </Typography>
        <IconButton onClick={closeEvidencePane} className={classes.closeIcon}>
          <KeyboardArrowDownIcon fontSize="large" color="primary" />
        </IconButton>
      </Box>
      <Box className={classes.contentContainer}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          doloremque earum eius id laborum natus officia omnis perspiciatis
          praesentium quo? Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Blanditiis culpa facilis ipsa numquam placeat possimus quas quos
          recusandae, rem velit. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Atque beatae error iste minima nisi odio omnis optio
          quam quisquam soluta? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit.
        </Typography>
      </Box>
    </Drawer>
  )
}

export default EvidencePreviewPane
