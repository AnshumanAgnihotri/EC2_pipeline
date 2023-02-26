// Material UI
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

// Styles
import useStyles from './customRow.styles'

// Components
import EmptyMessage from '../EmptyMessage'

function RowEmpty() {
  const classes = useStyles()

  return (
    <TableRow>
      <TableCell scope="row" className={classes.empty}>
        <EmptyMessage>No results were found</EmptyMessage>
      </TableCell>
    </TableRow>
  )
}

export default RowEmpty
