import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

// icons
import EditIcon from '@material-ui/icons/Edit'
import Gridicon from '@material-ui/icons/GridOn'
// Styles
import useStyles from './projectItem.styles'
import IconButton from '@material-ui/core/IconButton'
import EditProjectModal from '../EditProjectModal'
import OpenProjectModal from './openProjectModal.js'
// import { GridList } from '@material-ui/core'

function ProjectItem({ data, closeToggle }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
  const [openProjectModalOpen, setOpenProjectModalOpen] = useState(false)
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const selectedClass = useSelector(
    (state) => state.schoolClasses.selectedClass
  )
  const openProjectEditor = () => {
    setEditProjectModalOpen(true)
  }
  const openProjectPopup = () => {
    setOpenProjectModalOpen(true)
  }
  const closeProjectEditor = () => {
    setEditProjectModalOpen(false)
    dispatch.classesPage.removeProjectInformation(data.id)
    dispatch.classesPage.updateProjectTemplate({
      projectTemplateId: data.id,
      classId: selectedClass.id,
      selectedTermId: selectedTerm.id,
    })
    closeToggle()
  }
  const closeProjectModal = () => {
    setOpenProjectModalOpen(false)

    closeToggle()
  }
  return (
    <Box ml={1} display="flex" alignItems="center" width="100%">
      <Typography variant="h6">{data.name} </Typography>

      {data.creator && (
        <span className={classes.creator}>({data.creator.name})</span>
      )}

      {data.type === 'Template' && (
        <Box
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Tooltip title="Edit project" aria-label="edit project">
            <IconButton
              aria-label="edit project button"
              className={classes.editBtn}
              onClick={openProjectEditor}
            >
              <EditIcon fontSize="default" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open Project" aria-label="Open project">
            <IconButton
              aria-label="edit project button"
              className={classes.grid}
              onClick={openProjectPopup}
            >
              <Gridicon fontSize="default" />
            </IconButton>
          </Tooltip>
          <EditProjectModal
            projectId={data.id}
            modalOpened={editProjectModalOpen}
            handleCloseModal={closeProjectEditor}
          />
          <OpenProjectModal
            projectId={data.id}
            projectname={data.name}
            modalOpened={openProjectModalOpen}
            handleCloseModal={closeProjectModal}
          />
        </Box>
      )}
    </Box>
  )
}

export default ProjectItem
