import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: '40%',
    marginTop: 'auto',
    [theme.breakpoints.down('md')]: {
      height: '30%',
    },
  },
  drawerClose: {
    height: 0,
    width: 0,
  },
  paper: {
    height: 'auto',
  },
  closeIcon: {
    padding: theme.spacing(1),
    marginLeft: 'auto',
    alignSelf: 'start',
  },
  contentContainer: {
    padding: theme.spacing(2),
    overflowY: 'auto',
    overflowX: 'hidden',
    whiteSpace: 'normal',
  },
  title: {
    color: theme.palette.primary.dark,
    padding: theme.spacing(1.5),
  },
}))

export default useStyles
