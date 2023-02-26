import { useSelector } from 'react-redux'

import Modal from "react-bootstrap/Modal";
// Components
import Iframe from '../../shared/Iframe';

function SendProjectModal({ projectId, modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const user = useSelector((state) => state.user)

  const sendProjectSendUrl = () => {
    const teacherId = user?.teacher_id
    const selectedTermId = selectedTerm?.id
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    return `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/project_template/${projectId}/select_teachers?iframe=1&locale=en`
  }
  return (
    <Modal
    show={modalOpened ? true : false}
    dialogClassName="feedback-modal modal-xl"
>
    <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title">Send Project</h4>
            <button type="button" className="close" onClick={handleCloseModal}>
                &times;
            </button>
        </div>
        <div className="modal-body feedback-body">
            <div className="feedback-wrapper">
                <div className="row">
                    <Iframe url={sendProjectSendUrl()} height="750px" width="100%" />
                </div>
            </div>
        </div>
    </div>
</Modal>
  )
}

export default SendProjectModal
