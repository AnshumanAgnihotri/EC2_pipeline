import { useSelector } from 'react-redux'

import Modal from "react-bootstrap/Modal";
import Iframe from '../../shared/Iframe';

function CreateProjectModal({ modalOpened, handleCloseModal }) {
    const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
    const user = useSelector((state) => state.user)

    const createProjectUrl = () => {
        const teacherId = user?.teacher_id
        const selectedTermId = selectedTerm?.id
        const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
        return `${baseURL}/teachers/${teacherId}/pbl/school_terms/${selectedTermId}/project_library/select_project_type?locale=en&iframe=true`
    }
    return (
        <Modal
            show={modalOpened ? true : false}
            dialogClassName="feedback-modal modal-xl"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create Project </h4>
                    <button type="button" className="close" onClick={handleCloseModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body feedback-body">
                    <div className="feedback-wrapper">
                        <div className="row">
                            <Iframe url={createProjectUrl()} height="750px" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CreateProjectModal
