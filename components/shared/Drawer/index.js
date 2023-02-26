import PropTypes from 'prop-types'
import classNames from 'classnames'
import DrawerMaterial from '@material-ui/core/Drawer'
import useStyles from './drawer.styles'

Drawer.defaultProps = {
  width: 270,
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
}

function Drawer(props) {
  const classes = useStyles(props)
  const open = props.open
  return (
    <DrawerMaterial
      {...props}
      className={classNames(
        classes.drawer,
        {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        },
        props.className
      )}
      classes={{
        root: classes.root,
        paper: classNames(
          classes.paper,
          {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          },
          props.classes && props.classes.paper
        ),
      }}
    >
      {props.children}
    </DrawerMaterial>
  )
}

export default Drawer
