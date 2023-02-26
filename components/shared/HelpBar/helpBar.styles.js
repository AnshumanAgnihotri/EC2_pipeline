import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  drawerClose: {
    width: 0,
    position: 'fixed',
  },
  closeIcon: {
    padding: theme.spacing(1),
    marginLeft: 'auto',
    alignSelf: 'start',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  drawerContainer: {
    padding: theme.spacing(2),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  title: {
    color: theme.palette.primary.dark,
    padding: theme.spacing(1.5),
  },
}))

export default useStyles
