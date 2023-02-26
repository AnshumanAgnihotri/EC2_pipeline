import { useSelector } from 'react-redux'

import Modal from "react-bootstrap/Modal";
// Components
import Iframe from '../../shared/Iframe';

function ViewProjectModal({ projectId, modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const user = useSelector((state) => state.user)

  const getProjectEditorURL = () => {
    const teacherId = user?.teacher_id
    const selectedTermId = selectedTerm?.id
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    return `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/project_template/${projectId}/show_details?iframe=1&locale=en`;
    //    return (
    //   `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/` +
    //   `project_template/${projectId}/edit?iframe=teacher_portal_project_editor&from=teacher_portal_project_editor`
    // )
  }
  return (
    <Modal
    show={modalOpened ? true : false}
    dialogClassName="feedback-modal modal-xl"
>
    <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title">Project View</h4>
            <button type="button" className="close" onClick={handleCloseModal}>
                &times;
            </button>
        </div>
        <div className="modal-body feedback-body">
            <div className="feedback-wrapper">
                <div className="row">
                    <Iframe url={getProjectEditorURL()} height="750px" width="100%" />
                </div>
            </div>
        </div>
    </div>
</Modal>
  )
}

export default ViewProjectModal
