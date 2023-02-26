import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

// Material UI
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

// Icons
import TimelapseIcon from '@material-ui/icons/Timelapse'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { ReviewRequested } from '../CustomIcons'

// Style
import useStyles from './classBox.styles'

ClassBox.propTypes = {
  classInfo: PropTypes.object,
}

function ClassBox({ classInfo }) {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const { id, name, learners, evidences, projects } = classInfo
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const selectedClass = useSelector(
    (state) => state.schoolClasses.selectedClass
  )

  const handleClassClick = (classId) => {
    dispatch.schoolClasses.setSelectedClass(classId)
    const path = `/term/${selectedTerm.id}/class/${classId}`
    router.push(path)
  }

  return (
    <Box className={classes.classItem}>
      <Tooltip
        enterDelay={1000}
        enterNextDelay={1000}
        title={
          <>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">
              <strong>Learners:</strong> {learners}
            </Typography>
            <Typography variant="body1">
              <strong>Skills:</strong> {evidences.assignedSkills} assigned
            </Typography>
            <Typography variant="body1">
              <strong>Projects:</strong> {projects.assigned} assigned /{' '}
              {projects.createdByStudent} created by learners
            </Typography>
            <Typography variant="body1">
              <strong>Review requests:</strong> {evidences.reviewRequests}
            </Typography>
            <Typography variant="body1">
              <strong>Unread comments:</strong> {evidences.unreadComments}
            </Typography>
            <Typography variant="body1">
              <strong>Overdue:</strong> {evidences.overdue}
            </Typography>
          </>
        }
      >
        <Button
          className={classnames(classes.classButton, {
            selected: id === selectedClass?.id,
          })}
          variant="contained"
          disableElevation
          onClick={handleClassClick.bind(this, id)}
        >
          {name}
        </Button>
      </Tooltip>
      <div className={classes.classMenuContainer}>
        {evidences.reviewRequests > 0 && (
          <Tooltip title="Reviews requested" aria-label="reviews requested">
            <i>
              <ReviewRequested
                fontSize="small"
                className={classnames(classes.icon, 'pomegranate')}
              />
            </i>
          </Tooltip>
        )}
        {evidences.unreadComments > 0 && (
          <Tooltip title="Unread comments" aria-label="unread comments">
            <i>
              <FeedbackIcon
                fontSize="small"
                className={classnames(classes.icon, 'persian-green')}
              />
            </i>
          </Tooltip>
        )}
        {evidences.overdue > 0 && (
          <Tooltip title="Overdue" aria-label="overdue">
            <i>
              <TimelapseIcon
                fontSize="small"
                className={classnames(classes.icon, 'pomegranate')}
              />
            </i>
          </Tooltip>
        )}
      </div>
    </Box>
  )
}

export default ClassBox
