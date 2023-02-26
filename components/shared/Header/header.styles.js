import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.dark,
    padding: theme.spacing(2, 0, 2, 0),
    '&.small': {
      padding: 0,
    },
  },
  formControl: {
    marginLeft: 'auto',
    marginRight: theme.spacing(4),
    marginTop: '1.2rem',
    marginBottom: '1.2rem',
    flexDirection: 'row',
  },
  select: {
    background: 'white',
    minWidth: theme.spacing(25),
    '&.small > .MuiSelect-root': {
      padding: theme.spacing(0.5),
    },
  },
  projectLibraryBtn: {
    marginRight: theme.spacing(2),
    '&:hover': {
      border: '1px solid #FFFFFF',
    },
  },
  toolBarIcons: {
    '& > *': {
      color: theme.palette.icons.main,
    },
    '&.big  *': {
      fontSize: '4rem',
    },
  },
  disable: {
    pointerEvents: 'none',
    opacity: '0.4',
  },
}))

export default useStyles
