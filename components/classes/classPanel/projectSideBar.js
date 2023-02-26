import { useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
const ProjectSideBarDetail = ({ open, onClose, name, description,setIsExpand,isExpand }) => {
    const stepEvidence = useSelector((state) => state.dashboard.stepEvience);
    
    const handleExpands = () => {
        setIsExpand((prev) => !prev);
    }

    return (
        <div id="projectDetails" className="projectViewDetails" style={{ display: open && !stepEvidence?.isShow ? 'block' : 'none' }}>
            <div className="heading-wrap">
                <h2>{name}</h2>
                <div class="artifact-actions">
                        <ul>
                            <li>
                                <span class="expandArtifact" onClick={() => handleExpands()} style={{ display: isExpand ? 'none' : 'block' }}><i class="fas fa-expand"></i></span>
                                <span class="compressArtifact" onClick={() => handleExpands()} style={{ display: isExpand ? 'block' : 'none' }}><i class="fas fa-compress"></i></span>
                            </li>
                            <li><span id="closeArtifactPreview" onClick={() => onClose()}><i class="fas fa-times"></i></span></li>
                        </ul>
                    </div>
                {/* <span className="closeDiv ProjectDestilsClose" onClick={onClose}><i className="fas fa-times"></i></span> */}
            </div>
            <div className="left-project-details scrollBar learnerMiddleHeight">
                <p>{description ? ReactHtmlParser(description) : 'Not found'}</p>
            </div>
        </div>
    )
}

export default ProjectSideBarDetail