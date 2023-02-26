import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  classItem: {
    margin: '0 .5rem 0 0',
    border: `1px solid ${theme.palette.icons.gallery}`,
    minHeight: '9rem',
  },
  classMenuContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    color: theme.palette.icons.gray,
  },
  icon: {
    minWidth: 'auto',
    margin: '0 0.2rem',
  },
  classButton: {
    '&.selected': {
      backgroundColor: theme.palette.active.main,
      color: theme.palette.background.default,
    },
    '& > span': {
      whiteSpace: 'nowrap',
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    width: '100%',
    borderRadius: 0,
    textTransform: 'none',
    fontSize: '1.8rem',
    lineHeight: '4rem',
  },
}))

export default useStyles
