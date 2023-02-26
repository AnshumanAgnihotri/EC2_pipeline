import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    '& svg': {
      fontSize: '4rem',
      marginRight: '1rem',
      color: theme.palette.primary.dark,
    },
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
}))

export default useStyles
