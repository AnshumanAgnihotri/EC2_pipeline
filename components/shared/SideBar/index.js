import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

// Material UI
import IconButton from '@material-ui/core/IconButton'

// Components
import SideBarItem from './sideBarItem'
import Drawer from '../Drawer'

// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ClassesIcon from '@material-ui/icons/ViewColumnRounded'

// Styles
import useStyles from './sideBar.styles'
import List from '@material-ui/core/List'

function SideBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const open = useSelector((state) => state.app.sideBarOpen)
  const setOpen = dispatch.app.changeSideBarOpen
  const { selectedClass, schoolClasses } = useSelector(
    (state) => state.schoolClasses
  )
  console.log(selectedClass)
  // const schoolEvidences = useSelector(
  //   (state) => state.schoolEvidences.schoolEvidences
  // )
  // const schoolEvidences = ['All', 'Review', 'Overdiew', 'Upcoming']
  const setDrawerClosed = () => {
    setOpen(false)
  }

  const setDrawerOpen = () => {
    return !open && setOpen(true)
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      className={classNames({
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: classNames({
          [classes.drawerClose]: !open,
        }),
      }}
    >
      {open && (
        <div className={classNames(classes.drawerHeader, { open: open })}>
          <IconButton
            onClick={setDrawerClosed}
            className={classes.collapseIcon}
          >
            <ChevronLeftIcon fontSize="large" color="primary" />
          </IconButton>
        </div>
      )}
      <List disablePadding component="nav" className={classes.drawerContainer}>
        {schoolClasses && (
          <SideBarItem
            name={'Classes'}
            Icon={ClassesIcon}
            items={schoolClasses}
            setSideBarOpen={setDrawerOpen}
            sideBarOpen={open}
          />
        )}
      </List>
      {/* <List disablePadding component="nav" className={classes.drawerContainer}>
        {schoolClasses && (
          <SideBarItem
            name={'Evidence'}
            Icon={ClassesIcon}
            items={schoolEvidences}
            setSideBarOpen={setDrawerOpen}
            sideBarOpen={open}
          />
        )}
      </List> */}
    </Drawer>
  )
}

export default SideBar
