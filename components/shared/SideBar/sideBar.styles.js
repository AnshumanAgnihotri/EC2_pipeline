import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  drawerClose: {
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.icons.main,
    justifyContent: 'center',
    '&.open': {
      justifyContent: 'flex-end',
    },
  },
  collapseIcon: {
    padding: theme.spacing(0.5),
  },
  drawerContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
}))

export default useStyles
