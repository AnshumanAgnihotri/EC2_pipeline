import classnames from 'classnames'

// Material UI
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

// Components
import StudentsListTooltip from '../StudentsListTooltip'

// Icons
import TimelapseIcon from '@material-ui/icons/Timelapse'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { ReviewRequested } from '../CustomIcons'

// Styles
import useStyles from './learnerItem.styles'

function LearnerItem({ data, showEvidenceData = false }) {
  const { targetName, evidences, studentsList } = data
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center" className={classes.root} ml={1}>
      <Box flex={8}>
        <Typography variant="body1" className={classes.name}>
          {studentsList && studentsList.length > 0 ? (
            <Tooltip
              title={<StudentsListTooltip studentsList={studentsList} />}
            >
              <span>{targetName}</span>
            </Tooltip>
          ) : (
            targetName
          )}
        </Typography>
      </Box>

      {evidences && showEvidenceData && (
        <>
          <Box flex={1} display="flex" justifyContent="center">
            {evidences.overdue > 0 && (
              <Tooltip title="Overdue" aria-label="overdue">
                <Box display="flex" alignItems="center">
                  <TimelapseIcon fontSize="default" className="pomegranate" />
                  <Typography
                    variant="body1"
                    className={classnames(classes.label)}
                  >
                    {evidences.overdue}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>

          <Box flex={1} display="flex" justifyContent="center">
            {evidences.revisionRequest > 0 && (
              <Tooltip title="Reviews Requested" aria-label="reviews requested">
                <Box display="flex" alignItems="center">
                  <ReviewRequested className="pomegranate" />
                  <Typography
                    variant="body1"
                    className={classnames(classes.label)}
                  >
                    {evidences.revisionRequest}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>

          <Box flex={1} display="flex" justifyContent="center">
            {evidences.readComments > 0 && evidences.unreadComments === 0 && (
              <Tooltip title="Comments" aria-label="comments">
                <Box display="flex" alignItems="center">
                  <ChatBubbleIcon className="persian-green" />
                </Box>
              </Tooltip>
            )}

            {evidences.unreadComments > 0 && (
              <Tooltip title="Unread comments" aria-label="unread comments">
                <Box display="flex" alignItems="center">
                  <FeedbackIcon className="persian-green" />
                  <Typography
                    variant="body1"
                    className={classnames(classes.label)}
                  >
                    {evidences.unreadComments}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <Tooltip
              title="Learners completed this evidence"
              aria-label="learners completed this evidence"
            >
              <Typography variant="body1" className={classes.label}>
                {`${evidences.completedEvidence} of ${evidences.totalEvidences}`}
              </Typography>
            </Tooltip>
          </Box>
        </>
      )}
    </Box>
  )
}

export default LearnerItem
