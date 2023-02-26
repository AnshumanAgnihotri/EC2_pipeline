import { useSelector } from 'react-redux'

import Modal from "react-bootstrap/Modal";
import Iframe from '../../shared/Iframe';

function ManageAccountModal({modalOpened, handleCloseModal }) {
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const user = useSelector((state) => state.user)

  const manageAccountUrl = () => {
    const userId = user?.user_ids
    const baseURL = process.env.NEXT_PUBLIC_LEGACY_APP_URL
    window.location= `${baseURL}/users/${userId}/edit?locale=en`
  }
  return (
    <Modal
    show={modalOpened ? true : false}
    dialogClassName="feedback-modal modal-xl"
>
    <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title">Manage Account</h4>
            <button type="button" className="close" onClick={handleCloseModal}>
                &times;
            </button>
        </div>
        <div className="modal-body feedback-body">
            <div className="feedback-wrapper">
                <div className="row">
                    <Iframe url={manageAccountUrl()} height="750px" width="100%" />
                </div>
            </div>
        </div>
    </div>
</Modal>
  )
}

export default ManageAccountModal
