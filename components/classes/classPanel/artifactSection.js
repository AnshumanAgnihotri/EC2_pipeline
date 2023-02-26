import { useSelector,useDispatch } from "react-redux";
const ArtifactSection = ({open}) => {
    const dispatch = useDispatch();

    const handleArtifact = (status) => {
        dispatch.dashboard.artifactAction(status);
    }

    return (
        <>
            <div className="artifact-preview-box" style={{ display: open ? 'block':'' }}>
                <div className="heading-wrap">
                    <h2>Artifact Preview </h2>
                    <div className="artifact-actions">
                        <ul>
                            <li>
                                <span className="expandArtifact"><i className="fas fa-expand"></i></span>
                                <span className="compressArtifact"><i className="fas fa-compress"></i></span>
                            </li>
                            <li><span className="closeComments" onClick={() => handleArtifact(false)}><i className="fas fa-times"></i></span></li>
                        </ul>
                    </div>
                </div>
                <div className="scrollBar learnerMiddleHeight">
                <div className="artifact-image">
                    <img src="../images/artifact-preview.png" className="img-fluid" alt="" />
                </div>
                <div className="feedback-pictures">
                    <div className="doc-box">
                        <span className="image-icon"><i className="fas fa-file-image"></i></span>
                        <span className="uploded-text"><i>Picture The Business Plan.pdf</i></span>
                    </div>
                    <div className="actionButtons">
                        <button type="button" className="btn-delete">Delete</button>
                        <button type="button" className="btn-update" id="updateButton">Update</button>
                        <button type="button" className="btn-view view-preview">View</button>
                    </div>
                </div>
                <div className="feedback-update" style={{ display: 'none' }}>
                    <h3>Attach Evidence From</h3>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="radio-buttons">
                                <h4>Do you want to select ?</h4>
                                <div className="radio-groups">
                                    <div className="radio-1">
                                        <input type="radio" id="file" name="radioType" value="file" selected="selected" />
                                        <label for="file">File</label>
                                    </div>
                                    <div className="radio-1">
                                        <input type="radio" id="link" name="radioType" value="link" />
                                        <label for="link">Link</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12" id="attachLink">
                            <div className="form-group">
                                <label><span><i className="fas fa-file"></i></span>Computer file</label>
                                <input type="file" className="form-file" />
                            </div>
                        </div>
                        <div className="col-lg-12" id="attachUrl" style={{ display: 'none' }}>
                            <div className="form-group">
                                <label><span><i className="fas fa-link"></i></span>Add a link</label>
                                <input type="text" className="form-control" placeholder="Paste any url here..." />
                            </div>
                        </div>
                    </div>
                    <div className="actionButtons">
                        <button type="button" className="btn-delete" id="cancelButton">Cancel</button>
                        <button type="button" className="btn-update">Update</button>
                    </div>
                </div>
                </div>
            </div>
            <div className="fullArtifactPreview" style={{ display: 'none' }}>
                <ul className="ArtifactPreviewAction">
                    <li className="ArtifactCompress"><i className="fas fa-compress"></i></li>
                    <li className="ArtifactClose"><i className="fas fa-times"></i></li>
                </ul>
                <img src="images/artifact-preview.png" className="img-fluid" alt="" />
            </div>
        </>
    )
}

export default ArtifactSection