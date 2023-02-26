import classnames from 'classnames'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Material UI
import Box from '@material-ui/core/Box'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'

// Components
import SkillsRating from './skillsRating'
import EvidenceStatus from './evidenceStatus'
import StudentsListTooltip from '../StudentsListTooltip'

// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FeedbackIcon from '@material-ui/icons/Feedback'

// Styles
import useStyles from './evidenceItem.styles'

// Dynamic Imports
const EvidenceModal = dynamic(() => import('./evidenceModal'), { ssr: false })

function EvidenceItem({
  data,
  parentId = null,
  levelIdentifier = null,
  showTargetName,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const emptyValue = '–'
  const [modalOpened, setModalOpened] = useState(false)
  const uniqueId = parentId ? `${parentId}-${data.id}` : data.id
  const selectedEvidence = useSelector(
    (state) => state.classesPage.selectedEvidence
  )
  const isReadOnly = useSelector((state) => state.schoolTerms.isReadOnly)

  const handleRowClick = () => {
    dispatch.classesPage.setSelectedEvidence(
      selectedEvidence === uniqueId ? null : uniqueId
    )
  }

  const handleEvidenceClick = () => {
    setModalOpened(true)
  }

  const handleClosedModal = (evidenceId) => {
    handleFetchEvidenceData(evidenceId)
    setModalOpened(false)
  }

  const handleFetchEvidenceData = (evidenceId) => {
    dispatch.classesPage.getEvidenceInfo({
      evidenceId: evidenceId,
      levelIdentifier: levelIdentifier,
    })
  }

  const handleRubricChange = (externalSkillId, score, weight) => (event) => {
    event.stopPropagation()
    const value = event.target.value
    dispatch.classesPage.updateEvidenceScore({
      evidenceId: data.id,
      levelIdentifier: levelIdentifier,
      params: {
        score: score,
        externalLevelId: value !== emptyValue ? value : null,
        externalSkillId: externalSkillId,
        weight: weight,
      },
    })
  }

  const handleNumericChange = (externalSkillId, levelId, weight) => (
    event,
    value
  ) => {
    event.stopPropagation()
    value &&
      dispatch.classesPage.updateEvidenceScore({
        evidenceId: data.id,
        levelIdentifier: levelIdentifier,
        params: {
          score: value !== emptyValue ? value : null,
          externalLevelId: levelId,
          externalSkillId: externalSkillId,
          weight: weight,
        },
      })
  }

  return (
    <TableRow
      className={classnames(classes.root, {
        [classes.selected]: selectedEvidence === uniqueId,
      })}
      hover={true}
      onClick={handleRowClick}
    >
      <TableCell scope="row" className={classes.cell}>
        <Box display="flex" alignItems="center" ml={5}>
          <Box flex={4} display="flex" alignItems="center">
            <EvidenceStatus
              status={data.status}
              overdue={data.overdue}
              progressStatus={data.progress_status}
              locked={data.locked}
            />
            <Tooltip
              title={
                <>
                  {data.targetType === 'Team' &&
                    data.student_list &&
                    data.student_list.length > 0 && (
                      <StudentsListTooltip studentsList={data.student_list} />
                    )}
                  <span>
                    Updated: {new Date(data.updatedAt).toLocaleString()}
                  </span>
                </>
              }
              aria-label="last update"
            >
              <Link
                component="button"
                color="initial"
                onClick={handleEvidenceClick}
              >
                <Typography variant="body1" className={classes.label}>
                  {showTargetName ? data.targetName : data.evidenceName}
                </Typography>
              </Link>
            </Tooltip>
          </Box>
          <Box flex={4}>
            {data.score && data.score.length > 0 && (
              <SkillsRating
                evidenceScores={data.score}
                rubricRatingEnable={data.rubricRatingEnable}
                numericScoreEnable={data.numericScoreEnable}
                isReadOnly={isReadOnly}
                emptyValue={emptyValue}
                handleRubricChange={handleRubricChange}
                handleNumericChange={handleNumericChange}
              />
            )}
          </Box>
          <Box flex={2} />
          <Box flex={1} display="flex" justifyContent="center">
            {data.comments > 0 && data.unreadComments === 0 && (
              <Tooltip title="Comments" aria-label="comments">
                <Box display="flex" alignItems="center">
                  <ChatBubbleIcon className="persian-green" />
                </Box>
              </Tooltip>
            )}
            {data.unreadComments > 0 && (
              <Tooltip title="Unread comments" aria-label="unread comments">
                <Box display="flex" alignItems="center">
                  <FeedbackIcon className="persian-green" />
                </Box>
              </Tooltip>
            )}
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={() => false}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </TableCell>

      {modalOpened && (
        <EvidenceModal
          evidenceId={data.id}
          evidencesIdentifier={levelIdentifier}
          handleClosedModal={handleClosedModal}
          handleFetchEvidenceData={handleFetchEvidenceData}
          modalOpened={modalOpened}
        />
      )}
    </TableRow>
  )
}

export default EvidenceItem
