import { useSelector } from 'react-redux'

// Material UI Components
import Modal from '../Modal'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

// Components
import Iframe from '../Iframe'

function EditProjectModal({ projectId, modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const user = useSelector((state) => state.user)

  const getProjectEditorURL = () => {
    const teacherId = user?.teacher_id
    const selectedTermId = selectedTerm?.id
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    return (
      `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/` +
      `project_template/${projectId}/edit?iframe=teacher_portal_project_editor&from=teacher_portal_project_editor`
    )
  }

  return (
    <Modal
      open={modalOpened}
      onClose={handleCloseModal}
      aria-labelledby="Edit Project"
      aria-describedby="In this modal you can edit the project"
      disableBackdropClick
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Box mb={3}>
          <Typography variant="h4" color={'primary'}>
            Project Editor
          </Typography>
        </Box>
        <Iframe url={getProjectEditorURL()} height="95%" width="100%" />
      </Box>
    </Modal>
  )
}

export default EditProjectModal
