import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: '0 0 1.5rem 0',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: '1.8rem',
    margin: '0 0 1.5rem 0',
  },
  input: {
    margin: '1rem 0',
  },
}))

export default useStyles
