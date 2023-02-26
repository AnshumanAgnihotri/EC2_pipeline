import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: '112rem',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    padding: '2rem',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(20),
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  avatar: {
    margin: theme.spacing(0, 1, 1, 1),
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  imageContainer: {
    lineHeight: '0',
  },
  image: {
    height: 'auto',
    maxWidth: '30rem',
    margin: '0 auto',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '100%',
    },
  },
  forgotPasswordLink: {
    color: theme.palette.icons.azure,
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
}))

export default useStyles
