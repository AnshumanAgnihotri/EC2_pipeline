// Material UI
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

// Styles
import useStyles from './evidenceSimpleItem.styles'

function EvidenceSimpleItem({ data }) {
  const { name, studentStats } = data
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center" width="100%" ml={1}>
      <Box flex={11}>
        <Typography variant="body1" className={classes.name}>
          {name}
        </Typography>
      </Box>

      {studentStats && (
        <Box flex={1} display="flex" justifyContent="flex-end">
          <Tooltip
            title="Learners completed this evidence"
            aria-label="learners completed this evidence"
          >
            <Typography variant="body1" className={classes.label}>
              {`${studentStats.completedEvidence} of ${studentStats.totalEvidences}`}
            </Typography>
          </Tooltip>
        </Box>
      )}
    </Box>
  )
}

export default EvidenceSimpleItem
