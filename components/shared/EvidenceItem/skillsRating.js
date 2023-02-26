import classnames from 'classnames'

// Material UI
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// Component
import CustomTable from '../CustomTable'
import SelectElement from '../SelectElement'

// Utilities
import { formatOptions } from '../../../utils/utils'

// Styles
import useStyles from './evidenceItem.styles'

function SkillsRating({
  evidenceScores,
  rubricRatingEnable,
  numericScoreEnable,
  isReadOnly,
  emptyValue,
  handleRubricChange,
  handleNumericChange,
}) {
  const classes = useStyles()

  const numericOptions = () => {
    const options = [emptyValue]

    for (let i = 0; i <= 100; i++) {
      options.push(i.toString())
    }

    return options
  }

  return (
    <CustomTable>
      {evidenceScores.length > 0 &&
        evidenceScores.map((item) => (
          <TableRow key={item.externalSkillId} className={classes.skillRow}>
            <TableCell
              className={classnames(classes.skillName, classes.alternativeBg)}
              align="right"
            >
              <Typography variant="body1" className={classes.label}>
                {item.name}
              </Typography>
            </TableCell>
            <TableCell className={classes.rubricRating}>
              {rubricRatingEnable && (
                <SelectElement
                  selectId={item.externalSkillId}
                  options={formatOptions(item.levels, emptyValue)}
                  selectedOption={item.levelId || emptyValue}
                  disabled={isReadOnly}
                  handleChange={handleRubricChange(
                    item.externalSkillId,
                    item.score,
                    item.weight
                  )}
                />
              )}
            </TableCell>
            <TableCell
              className={classnames(
                classes.numericRating,
                classes.alternativeBg
              )}
            >
              {numericScoreEnable && (
                <Autocomplete
                  options={numericOptions()}
                  autoHighlight={true}
                  getOptionLabel={(option) => option}
                  value={`${item.score || emptyValue}`}
                  size="small"
                  disabled={isReadOnly}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={handleNumericChange(
                    item.externalSkillId,
                    item.levelId,
                    item.weight
                  )}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
    </CustomTable>
  )
}

export default SkillsRating
