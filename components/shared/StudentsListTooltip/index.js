// Material UI
import Box from '@material-ui/core/Box'

// Styles
import useStyles from './studentsListTooltip.styles'

function StudentsListTooltip({ studentsList }) {
  const classes = useStyles()

  return (
    <Box>
      <strong className={classes.title}>Students List</strong>
      <ul className={classes.listContainer}>
        {studentsList.map((item) => {
          return (
            <li key={`student-${item.id}`} className={classes.label}>
              {item.targetName}
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default StudentsListTooltip
