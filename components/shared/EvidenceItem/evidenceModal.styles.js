import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  iframeTitles: {
    padding: theme.spacing(1),
  },
  evidenceFeedbackContainer: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    marginRight: theme.spacing(3),
  },
  artifact: {
    width: '96%',
    height: '90%',
    border: '1px solid #B1B3B6',
    borderRadius: '4px',
  },
  prevNextWrapper: {
    '& button': {
      marginRight: theme.spacing(1),
    },
  },
  refreshButton: {
    backgroundColor: theme.palette.background.default,
  },
}))

export default useStyles
