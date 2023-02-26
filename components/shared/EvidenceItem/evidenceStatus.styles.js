import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  overdue: {
    position: 'absolute',
    top: '-6px',
    right: 0,
    width: '1.5rem',
    height: '1.5rem',
  },
  icon: {
    fontSize: '3rem',
    marginRight: theme.spacing(1.5),
  },
}))

export default useStyles
