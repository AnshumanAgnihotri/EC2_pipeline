import Link from 'next/link'

// Material UI
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'

function SettingsMenu({ open, anchorEl, handleSettingsMenuClose }) {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      disablePortal
      placement="bottom-end"
    >
      <Paper>
        <ClickAwayListener onClickAway={handleSettingsMenuClose}>
          <MenuList id="menu-list-grow" autoFocusItem={open}>
            <MenuItem onClick={handleSettingsMenuClose}>
              <Link href="/manage_account">
                <a>Manage Account</a>
              </Link>
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Popper>
  )
}

export default SettingsMenu
