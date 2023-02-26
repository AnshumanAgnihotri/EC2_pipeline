import { useSelector } from 'react-redux'

import Modal from 'react-bootstrap/Modal'
// Components
import Iframe from '../../shared/Iframe'
import { useState } from 'react'

function EditProjectModal({ projectId, modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const user = useSelector((state) => state.user)
  const [isOPen, setIsOPen] = useState(false)
  const getProjectEditorURL = () => {
    const teacherId = user?.teacher_id
    const selectedTermId = selectedTerm?.id
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    return (
      `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/` +
      `project_template/${projectId}/edit?iframe=teacher_portal_project_editor&from=teacher_portal_project_editor`
    )
  }
  const handleCloseModalHandler = () => {
    setIsOPen((prev) => !prev)
  }
  const closeConfirmationModal = () => {
    setIsOPen((prev) => !prev)
    handleCloseModal()
  }

  return (
    <>
      <Modal show={!!modalOpened} dialogClassName="feedback-modal modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Project Editor</h4>
            <button
              type="button"
              className="close"
              onClick={handleCloseModalHandler}
            >
              &times;
            </button>
          </div>
          <div className="modal-body feedback-body">
            <div className="feedback-wrapper">
              <div className="row">
                <Iframe
                  url={getProjectEditorURL()}
                  height="750px"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="modalSuccess"
        show={!!isOPen}
        dialogClassName="custom-modal width450"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Confirmation</h4>
          </div>
          <div className="modal-body">
            <div className="modal-text">
              <p>Please save any unsaved data before you close this window. </p>
            </div>
            <div className="modal-buttons d-flex justify-content-center align-items-center p-4">
              <button
                type="button"
                className="smallbtn btn-black btn-close"
                onClick={() => setIsOPen((prev) => !prev)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="smallbtn btn btn-save"
                onClick={closeConfirmationModal}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditProjectModal
