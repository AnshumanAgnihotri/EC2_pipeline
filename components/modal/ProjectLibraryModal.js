// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// Components
import Modal from "react-bootstrap/Modal";
import Iframe from '../shared/Iframe';

function ProjectLibraryModal({ url, modalOpened, handleCloseModal }) {
    return (
        <Modal
            show={modalOpened ? true : false}
            dialogClassName="feedback-modal modal-xl"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Project Library</h4>
                    <button type="button" className="close" onClick={handleCloseModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body feedback-body">
                    <div className="feedback-wrapper">
                        <div className="row">
                            <Iframe url={url} height="750px" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProjectLibraryModal