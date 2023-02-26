import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.silver': {
      color: theme.palette.icons.silver,
    },
    '.carrot-orange': {
      color: theme.palette.icons.carrotOrange,
    },
    '.cerulean': {
      color: theme.palette.icons.cerulean,
    },
    '.pomegranate': {
      color: theme.palette.icons.pomegranate,
    },
    '.green-haze': {
      color: theme.palette.icons.greenHaze,
    },
    '.persian-green': {
      color: theme.palette.icons.persianGreen,
    },
    '.plum': {
      color: theme.palette.icons.plum,
    },
    '.azure': {
      color: theme.palette.icons.azure,
    },
  },
  content: {
    flexGrow: 1,
    overflowX: 'scroll',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100vh - ${
      theme.mixins.toolbar.height +
      theme.spacing(5) +
      theme.mixins.classesBar.height
    }px)`,
    '& > div': {
      minWidth: '120rem',
    },
    [theme.breakpoints.down('md')]: {
      height: `calc(100vh - ${
        theme.mixins.toolbar.height +
        theme.spacing(5) +
        theme.mixins.classesBar.height * 2
      }px)`,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

export default useStyles
