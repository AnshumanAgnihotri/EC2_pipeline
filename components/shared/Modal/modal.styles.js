import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  evidenceModal: {
    height: '100vh',
    width: '100vw',
  },
  modalPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    borderRadius: theme.spacing(2),
    height: '90%',
    overflow: 'auto',
  },
  closeButton: {
    backgroundColor: theme.palette.background.default,
  },
}))

export default useStyles
