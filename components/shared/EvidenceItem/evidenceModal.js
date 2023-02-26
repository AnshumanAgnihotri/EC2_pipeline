import { useEffect, useState } from 'react'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

import { useSelector } from 'react-redux'

// Material UI
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// Components
import Iframe from '../Iframe'
import Modal from '../Modal'

// Icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import RefreshIcon from '@material-ui/icons/Refresh'

// Utils
import { addProtocolURL } from '../../../utils/utils'

// styles
import useStyles from './evidenceModal.styles'

function EvidenceModal({
  evidenceId,
  evidencesIdentifier,
  modalOpened,
  handleClosedModal,
  handleFetchEvidenceData,
}) {
  const classes = useStyles()
  const [currentEvidenceId, setCurrentEvidenceId] = useState(null)

  useEffect(() => {
    setCurrentEvidenceId(evidenceId)
  }, [])

  const teacherId = useSelector((state) => state.user.teacher_id)
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const evidences = useSelector((state) => state.classesPage.evidences)
  const siblings = evidences[evidencesIdentifier]
  let currentIndex = siblings.findIndex(
    (sibling) => sibling.id === currentEvidenceId
  )
  const evidenceData = siblings.find((item) => item.id === currentEvidenceId)

  const artifactURL = evidenceData?.url || ''
  const isFile = artifactURL.includes('s3.amazonaws.com')
  const isGoogleDoc = artifactURL.includes('docs.google.com')
  const displayArtifact = evidenceData?.url && (isFile || isGoogleDoc)

  const getEvidencePageURL = (projectId, stepId, evidenceId) => {
    const selectedTermId = selectedTerm.id
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    return (
      `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/project/${projectId}/step/${stepId}/` +
      `evidence/${evidenceId}/show_iframe?iframe=1`
    )
  }

  const prevNextHandler = (advance = true) => {
    currentIndex = currentIndex + (advance ? 1 : -1)
    setCurrentEvidenceId(siblings[currentIndex].id)
  }

  const nextEvidence = () => prevNextHandler()
  const prevEvidence = () => prevNextHandler(false)

  const getArtifactRenderElement = (artifactUrl, artifactType) => {
    // artifact provided by rails that is not video
    /*if (isFile && !artifactType?.includes('video')) {
      const documents = [{ uri: artifactUrl, fileType: artifactType }]
      const config = { header: { disableHeader: true } }
      return (
        <DocViewer
          key={`${artifactUrl}-${Math.random()}`}
          pluginRenderers={DocViewerRenderers}
          documents={documents}
          config={config}
          className={classes.artifact}
        />
      )
    }
    // artifact provided by rails that is video
    else*/ if (isFile && artifactType.includes('video')) {
      return (
        <video
          className={classes.artifact}
          src={artifactUrl}
          width="100%"
          height="90%"
          controls
        />
      )
    }
    // artifact provided by google that is video
    else if (isGoogleDoc) {
      return (
        <Iframe
          url={addProtocolURL(artifactUrl)}
          height="90%"
          width="100%"
          className={classes.artifact}
        />
      )
    }
  }

  return (
    <Modal
      open={modalOpened}
      onClose={handleClosedModal.bind(this, evidenceData?.id)}
      aria-labelledby={`Feedback page of the evidence: ${evidenceData?.evidenceName}`}
      aria-describedby="In this modal you can see the comments and the artifact of the evidence"
      disableBackdropClick
    >
      <Box
        position="absolute"
        className={classes.refreshButton}
        margin={-2}
        right={118}
      >
        <Tooltip title="Refresh evidence information">
          <IconButton
            onClick={handleFetchEvidenceData.bind(this, evidenceData?.id)}
          >
            <RefreshIcon fontSize="large" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        display="flex"
        height="100%"
        width={displayArtifact ? '150%' : ' 100%'}
        overflow="auto"
      >
        <Box className={classes.evidenceFeedbackContainer}>
          <Typography
            variant="h4"
            color={'primary'}
            className={classes.iframeTitles}
          >
            Feedback
            <Box
              display="inline-flex"
              ml={3}
              className={classes.prevNextWrapper}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<NavigateBeforeIcon />}
                onClick={prevEvidence}
                disabled={currentIndex === 0}
                title="Previous Evidence"
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<NavigateNextIcon />}
                onClick={nextEvidence}
                disabled={currentIndex === siblings.length - 1}
                title="Next Evidence"
              >
                Next
              </Button>
            </Box>
          </Typography>
          <Iframe
            url={getEvidencePageURL(
              evidenceData?.projectId,
              evidenceData?.pbl_step_id,
              evidenceData?.id
            )}
            height="90%"
            width="100%"
          />
        </Box>
        {displayArtifact && (
          <Box width="100%">
            <Typography
              variant="h4"
              color="primary"
              className={classes.iframeTitles}
            >
              Artifact preview
            </Typography>
            {getArtifactRenderElement(
              evidenceData?.url,
              evidenceData?.artifactType
            )}
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default EvidenceModal
