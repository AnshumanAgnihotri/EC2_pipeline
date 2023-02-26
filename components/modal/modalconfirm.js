
import Modal from "react-bootstrap/Modal";

const modalconfirm = (props) => {
    const { open, onClose, itemCount, submitBulkHandler,status } = props;
    return (
        <Modal
            show={open ? true : false}
            dialogClassName="custom-modal width450"
        >
            <div className="modal-header">
                <h4 className="modal-title">Confirmation</h4>
            </div>
            <div className="modal-body">
                <div className="modal-text">
                    <p>You are updating the status of {itemCount} items to {status}.</p>
                    <p>Do you wish to continue?</p>
                </div>
                <div className="modal-buttons d-flex justify-content-center align-items-center p-4">
                    <button type="button" className="smallbtn btn-black btn-close" onClick={() => onClose()}>No,Cancel</button>
                    <button type="button" className="smallbtn btn btn-save" onClick={() => submitBulkHandler()}>Yes</button>
                </div>
            </div>
        </Modal>
    )
}

export default modalconfirm;