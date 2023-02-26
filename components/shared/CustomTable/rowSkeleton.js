// Material UI
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { Skeleton } from '@material-ui/lab'

// Styles
import useStyles from './customRow.styles'

function RowSkeleton() {
  const classes = useStyles()

  return (
    <TableRow>
      <TableCell scope="row" className={classes.removePadding}>
        <Skeleton variant="rect" width="100%" height={50} />
      </TableCell>
    </TableRow>
  )
}

export default RowSkeleton
