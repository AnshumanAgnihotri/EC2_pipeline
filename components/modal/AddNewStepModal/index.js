import { useSelector } from 'react-redux'
import Modal from "react-bootstrap/Modal";
import Iframe from '../../shared/Iframe';

function AddNewStepModal({ projectId, modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const user = useSelector((state) => state.user)
  const currentclass = useSelector((state) => state.schoolClasses.selectedClass);
    

  const getProjectCopyURL = () => {
    const studentId = user?.student_id
    const selectedTermId = selectedTerm?.id;
    const currentClassId = currentclass?.id
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    console.log(`${baseURL}/en/students/${studentId}/pbl/school_terms/${selectedTermId}/school_class/${currentClassId}/project/${projectId}/edit?iframe=true`);
    return `${baseURL}en/students/${studentId}/pbl/school_terms/${selectedTermId}/school_class/${currentClassId}/project/${projectId}/edit?iframe=true`;
  }
  return (
    <Modal
    show={modalOpened ? true : false}
    dialogClassName="feedback-modal modal-xl"
>
    <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title">Add New Step</h4>
            <button type="button" className="close" onClick={handleCloseModal}>
                &times;
            </button>
        </div>
        <div className="modal-body feedback-body">
            <div className="feedback-wrapper">
                <div className="row">
                    <Iframe url={getProjectCopyURL()} height="750px" width="100%" />
                </div>
            </div>
        </div>
    </div>
</Modal>
  )
}

export default AddNewStepModal
