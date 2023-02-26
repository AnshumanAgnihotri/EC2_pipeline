import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  gutters: {
    paddingLeft: theme.spacing(1),
  },
  listHeader: {
    top: 0,
    zIndex: 1,
    position: 'sticky',
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  /* It is necessary to set this class in root because with the selected class it did not work.  */
  selectedItem: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.active.main,
      color: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.active.main,
      },
    },
  },
  selectedItemIcon: {
    color: theme.palette.primary.contrastText,
  },
  itemText: {
    '& > span': {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
    },
  },
  subItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}))

export default useStyles
