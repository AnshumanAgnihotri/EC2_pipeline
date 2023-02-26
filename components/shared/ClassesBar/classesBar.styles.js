import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'sticky',
    overflowX: 'hidden',
    background: theme.palette.background.default,
    zIndex: '1099',
  },
  classesContainer: {
    '& .slick-arrow': {
      display: 'block',
      width: '3.5rem',
      height: '3.5rem',
      '&.slick-prev': {
        left: '-3.5rem',
      },
      '&.slick-next': {
        right: '-3.5rem',
      },
      '&.slick-disabled': {
        opacity: '0.5',
      },
      '&:before': {
        display: 'none',
      },
    },
    width: '100%',
    height: theme.mixins.classesBar.height,
  },
  listItem: {
    fontSize: '1.5rem',
    lineHeight: '1.8rem',
    paddingTop: '0',
  },
  listItemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(1),
  },
}))

export default useStyles
