import PropTypes from 'prop-types'

// Material UI
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

TabBar.propTypes = {
  items: PropTypes.array,
  handleTabChange: PropTypes.func,
  selectedValue: PropTypes.string,
}

function TabBar({ items, selectedValue, handleTabChange, ...props }) {
  return (
    <Tabs
      {...props}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleTabChange}
      value={selectedValue}
    >
      {items.length > 0 &&
        items.map(({ id, label, value, isDisabled }) => (
          <Tab key={id} label={label} value={value} disabled={isDisabled} />
        ))}
    </Tabs>
  )
}
export default TabBar
