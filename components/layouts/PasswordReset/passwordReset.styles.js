import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '4rem 0',
    border: '1px solid',
    padding: '3rem',
    borderColor: theme.palette.icons.gray,
    width: '90%',
    maxWidth: '60rem',
  },
}))

export default useStyles
