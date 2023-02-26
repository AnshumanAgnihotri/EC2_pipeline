import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '2rem',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}))

export default useStyles
