import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
  },
  cell: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  skillRow: {
    '&:last-child td': {
      border: 'none',
    },

    '& td': {
      paddingTop: theme.spacing(1.3),
      paddingBottom: theme.spacing(1.3),
    },
  },
  alternativeBg: {
    backgroundColor: theme.palette.icons.wildSand,
  },
  skillName: {
    minWidth: '21.2rem',
    maxWidth: '21.2rem',
  },
  rubricRating: {
    minWidth: '19.5rem',
    maxWidth: '19.5rem',

    '& > div': {
      marginTop: 0,
      marginBottom: 0,
      width: '100%',

      '& > div': {
        marginTop: 0,
      },
    },
  },
  numericRating: {
    minWidth: '12.5rem',
    maxWidth: '12.5rem',
  },
  label: {
    fontSize: '1.8rem',
    textTransform: 'initial',
  },
  selected: {
    border: '2px solid',
    borderColor: theme.palette.icons.carrotOrange,
  },
}))

export default useStyles
