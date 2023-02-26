import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(0.2),
  },
  paper: {
    position: 'relative',
    height: `calc(100vh - ${
      theme.mixins.toolbar.height +
      theme.spacing(5) +
      theme.mixins.classesBar.height
    }px)`,
    [theme.breakpoints.down('md')]: {
      height: `calc(100vh - ${
        theme.mixins.toolbar.height +
        theme.spacing(5) +
        theme.mixins.classesBar.height * 2
      }px)`,
    },
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: (props) => props.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}))

export default useStyles
