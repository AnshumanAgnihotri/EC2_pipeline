import Proptypes from 'prop-types'

// Material UI
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

// Styles
import useStyles from './customTable.styles'

CustomTable.propTypes = {
  children: Proptypes.any,
}

function CustomTable({ children }) {
  const classes = useStyles()

  return (
    <TableContainer className={classes.container}>
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomTable
