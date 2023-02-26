import React, { useState } from 'react'

// Material UI
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'

// Icons
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

// Components
import CustomTable from './index'
import RowSkeleton from './rowSkeleton'
import RowEmpty from './rowEmpty'
import RowLvl2 from './rowLvl2'

// Styles
import useStyles from './customRow.styles'

function CustomRow({ children, isExpandable, treeHelpers }) {
  const classes = useStyles()
  const { item: L2Item, items, parentId } = treeHelpers.level2
  const itemsLevel3 = treeHelpers.level3.items
  const [open, setOpen] = useState(false)

  const handleCollapseToggle = () => {
    setOpen(!open)
    if (!items || (items && items.length === 0 && !open))
      treeHelpers.level2.getItems()
  }

  const closeToggle = () => {
    setOpen(false)
  }

  return (
    <TableRow>
      <TableCell scope="row" className={classes.removePadding}>
        <Box display="flex" alignItems="center" className={classes.firstLevel}>
          {isExpandable && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleCollapseToggle}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
          {React.cloneElement(children, {
            closeToggle: closeToggle,
          })}
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
                  <RowLvl2
                    key={`${parentId}-${item.id}`}
                    isExpandable={true}
                    treeHelpers={{
                      ...treeHelpers,
                      level3: {
                        ...treeHelpers.level3,
                        parentId: item.id,
                        items: itemsLevel3
                          ? itemsLevel3[
                              `${treeHelpers.level2.parentId}-${item.id}`
                            ]
                          : null,
                      },
                    }}
                  >
                    <L2Item data={item} {...treeHelpers.level2.props} />
                  </RowLvl2>
                ))}
            </CustomTable>
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  )
}

export default CustomRow
