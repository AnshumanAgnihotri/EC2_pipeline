import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  creator: {
    fontSize: '1.5rem',
    fontWeight: 'lighter',
    fontStyle: 'italic',
    marginLeft: theme.spacing(1),
  },
  editBtn: {
    padding: theme.spacing(0, 1),
  },
}))

export default useStyles
