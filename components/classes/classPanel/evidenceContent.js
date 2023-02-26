import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { isEmptyArray } from '../../../utils/utils';
const EvidenceContent = ({setIsExpand,isExpand,onClose}) => {
    const dispatch = useDispatch();
    const stepEvidence = useSelector((state) => state.dashboard.stepEvience);
    const handleExpands = () => {
        setIsExpand((prev) => !prev);
    }
    return (
        <div id="evidenceContentDetails" className="projectViewDetails" style={{ display: stepEvidence?.isShow ? 'block' : 'none' }}>
            <div className="heading-wrap">
                <h2>{stepEvidence?.name}</h2>
                <div class="artifact-actions">
                        <ul>
                            <li>
                                <span class="expandArtifact" onClick={() => handleExpands()} style={{ display: isExpand ? 'none' : 'block' }}><i class="fas fa-expand"></i></span>
                                <span class="compressArtifact" onClick={() => handleExpands()} style={{ display: isExpand ? 'block' : 'none' }}><i class="fas fa-compress"></i></span>
                            </li>
                            <li><span id="closeArtifactPreview" onClick={() => onClose()}><i class="fas fa-times"></i></span></li>
                        </ul>
                    </div>
                {/* <span className="closeDiv closeComments" onClick={() => close()}><i className="fas fa-times"></i></span> */}
            </div>
            <div className="left-project-details stepDetails scrollBar learnerMiddleHeight">
                <p>{stepEvidence?.description ? ReactHtmlParser(stepEvidence?.description) : <p className="noData-wrap">No Record found</p>}</p>
                <div class="externalLink">
                    <ul>
                        {stepEvidence?.pbl_resources && !isEmptyArray(stepEvidence?.pbl_resources) && stepEvidence?.pbl_resources.map((resource) => {
                            return (
                            <li>
                                <a href={resource.url} target="_blank" title={resource.url}>
                                    <span><i class="far fa-file-pdf"></i></span>
                                    {resource.title}
                                </a>
                            </li>
                            )
                        })}
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default EvidenceContent