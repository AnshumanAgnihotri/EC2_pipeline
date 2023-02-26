import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  firstLevel: {
    backgroundColor: theme.palette.active.main,
    padding: `1rem 2rem`,
    color: theme.palette.background.default,
    '& button': {
      color: theme.palette.background.default,
    },
  },
  secondLevel: {
    backgroundColor: theme.palette.icons.wildSand,
    padding: `1rem 2rem`,
    color: theme.palette.icons.black,
  },
  removePadding: {
    padding: 0,
  },
  empty: {
    padding: `1rem 6rem`,
  },
}))

export default useStyles
