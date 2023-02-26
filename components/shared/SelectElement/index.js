import PropTypes from 'prop-types'

// Material UI
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

SelectElement.propTypes = {
  selectId: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  handleChange: PropTypes.func,
}

function SelectElement({
  selectId,
  label,
  options,
  selectedOption,
  handleChange,
  ...props
}) {
  const labelId = `${label}-label`

  return (
    <div class="col-lg-6 pl-1 pr-1">
			<div class="form-group">
      <select
        labelId={labelId}
        id={selectId}
        value={selectedOption}
        label={label}
        onChange={handleChange}
        className='form-control'
      >
        {options.length > 0 &&
          options.map(({ id, value, label }) => (
            <option key={id} value={value}>
              {label}
            </option>
          ))}
      </select>
      </div>
      </div>
  )
}

export default SelectElement
