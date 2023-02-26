import { useState } from 'react'

// Material UI
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'

// Components
import CustomTable from './index'
import RowSkeleton from './rowSkeleton'
import RowEmpty from './rowEmpty'

// Icons
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

// Styles
import useStyles from './customRow.styles'

function RowLvl2({ children, isExpandable, treeHelpers }) {
  const classes = useStyles()
  const { level2, level3 } = treeHelpers
  const { item: L3Item, items } = level3
  const [open, setOpen] = useState(false)

  const handleCollapseToggle = () => {
    setOpen(!open)
    if (!items || (items && items.length === 0 && !open))
      level3.getItems(level2.parentId, level3.parentId)
  }

  return (
    <TableRow>
      <TableCell scope="row" className={classes.removePadding}>
        <Box display="flex" alignItems="center" className={classes.secondLevel}>
          {isExpandable && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleCollapseToggle}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
          {children}
        </Box>
        {isExpandable && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CustomTable>
              {/* Shows skeleton as loader */}
              {!items && <RowSkeleton />}

              {/* Shows empty message */}
              {items && items.length === 0 && <RowEmpty />}

              {/* Shows the list */}
              {items &&
                items.length > 0 &&
                items.map((item) => (
                  <L3Item
                    key={`${level3.parentId}-${item.id}`}
                    data={item}
                    parentId={level3.parentId}
                    levelIdentifier={`${level2.parentId}-${level3.parentId}`}
                    {...level3.props}
                  />
                ))}
            </CustomTable>
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  )
}

export default RowLvl2
