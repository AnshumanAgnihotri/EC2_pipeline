import { useSelector } from 'react-redux'

import Modal from 'react-bootstrap/Modal'
// Components
import Iframe from '../../shared/Iframe'
import { useState } from 'react'

function AssignSkillModal({modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const currentclass = useSelector((state) => state.schoolClasses.selectedClass)
  const user = useSelector((state) => state.user)
  const [isOPen, setIsOPen] = useState(false)
  const gotoURL = () => {
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    return `${baseURL}/teachers/${user?.teacher_id}/pbl/school_terms/${selectedTerm?.id}/school_class/${currentclass?.id}/assign_skills/show_skill_accordions?from=workspace&locale=en&iframe=true`
  }
  return (
    <>
      <Modal show={!!modalOpened} dialogClassName="feedback-modal modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Assign Skills</h4>
            <button
              type="button"
              className="close"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
          <div className="modal-body feedback-body">
            <div className="feedback-wrapper">
              <div className="row">
                <Iframe
                  url={gotoURL()}
                  height="750px"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AssignSkillModal
