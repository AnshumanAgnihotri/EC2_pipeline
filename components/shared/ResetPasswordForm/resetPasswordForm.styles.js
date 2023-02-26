import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: '0 0 1.5rem 0',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: '1.6rem',
    margin: '0 0 1.5rem 0',
  },
  helpText: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
  },
  helpTextIcon: {
    position: 'relative',
    top: '0.2rem',
    marginRight: '0.5rem',
  },
  input: {
    margin: '1rem 0',
  },
  link: {
    cursor: 'pointer',
  },
}))

export default useStyles
