// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// Components
import Modal from '../Modal'
import Iframe from '../Iframe'

function ProjectLibraryModal({ url, modalOpened, handleCloseModal }) {
  return (
    <Modal
      open={modalOpened}
      onClose={handleCloseModal}
      aria-labelledby="Project Library"
      aria-describedby="In this modal you can see the project library"
      disableBackdropClick
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Box mb={3}>
          <Typography variant="h4" color={'primary'}>
            Project Library
          </Typography>
        </Box>
        <Iframe url={url} height="95%" width="100%" />
      </Box>
    </Modal>
  )
}

export default ProjectLibraryModal
