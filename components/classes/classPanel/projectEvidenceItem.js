
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import {
    isEmptyArray, getEvidenceStatusIcon,
    getEvidenceStatus, pblResourceHasDocument, artifactHasAttachment
} from "../../../utils/utils";
import SkillSection from "./skillSection";
import AssignmentAction from "./assignmentStartReviewAction";
import AddNewStepModal from "../../modal/AddNewStepModal";
import Link from 'next/link'
import { isEmptyObject } from "jquery";

const ProjectEvidenceItem = ({ show, stepData, handleComment, handleArtifact, onUpdateStatus }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const successMessage = useSelector(
        (state) => state.dashboard.successMessage
    )
    const handleSuccessMessageClose = () => {
        dispatch.dashboard.setSuccessMessage(null)
    }

    const stepEvidenceHandler = (e, stepInfo) => {
        const params = { isShow: true, name: stepInfo?.name, description: stepInfo?.description, pbl_resources: stepInfo.pbl_resources }
        dispatch.dashboard.showStepEvidenceDescriptionAction(params);
        dispatch.dashboard.commentAction(false);
        dispatch.dashboard.artifactAction(false);
    }
    const [addNewProject, setAddNewProject] = useState(false);
    const addNewStepHandler = () => {
        setAddNewProject(true)
    }
    const projectId = useSelector((state) => state.dashboard.currentProject);

    const handleCloseModal = () => {
        setAddNewProject(false)
        router.reload()
    }


    return (

        <div className="projectPage-wrap" style={{ display: show ? 'block' : 'none' }}>
            <div className="subheading-wrap project-headwrap">
                <h2>Steps</h2>
                {/* <div className="action-filter">
                    <button id="bulkHendle" type="button" className="btn btn-custom" onClick={addNewStepHandler}><span><i className="fas fa-plus"></i></span>Add New Step</button>
                </div> */}
            </div>
            <div className="scrollBar learnerMiddleHeight">
                {stepData?.steps !== undefined && !isEmptyArray(stepData?.steps) && stepData?.steps.map((stepEvidence, key) => {
                    return (
                        <div className="projectView-wrapper" key={`step-${key}`}>
                            <div className="stepDetails">
                                <h2>{stepEvidence.name}
                                    <span className="viewEvidenceDts" onClick={(e) => stepEvidenceHandler(e, stepEvidence)}>View Details</span>
                                </h2>
                            </div>
                            {!isEmptyArray(stepEvidence?.evidences) && stepEvidence?.evidences.map((evidence, key) => (
                                <div className="project-evidence-step" key={`step-evidence-${key}`}>
                                    <div className="project view-details">
                                        <div className="projectViewLeft">
                                            <h4>{evidence.name}</h4>
                                            <ul class="resourcesLink">
                                                {evidence?.pbl_resources.filter((resource) => resource.document_id == null).map((resource) => {
                                                    return (
                                                        <li>
                                                            <Link href={resource?.url}>
                                                                <a className={`resourcesLink`} title={resource.title} target="_blank"> {resource?.title}</a>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <div className={`projectView-status status-${evidence?.status} d-inline-flex`}>
                                                <span className="material-icons">
                                                    {getEvidenceStatusIcon(evidence?.status)}
                                                </span>
                                                {getEvidenceStatus(evidence?.status)}
                                            </div>
                                            <SkillSection
                                                skillLists={evidence?.skills}
                                                isNumericRating={evidence?.numeric_score_enabled}
                                                isRubricRating={evidence?.rubric_rating_enabled}
                                                schoolSkills={stepData?.school_skills}
                                                key={key} />
                                        </div>
                                        <div className="projectViewRight">
                                            {evidence.pbl_resources.filter((res) => res.document_id).map((resource, index) => {
                                                return (
                                                    <AssignmentAction isGoogleTemplate={true} key={index} currentIndex={key} evidence={evidence} pbl_resources={resource} onUpdateStatus={onUpdateStatus} />
                                                )
                                            })}

                                            <ul>
                                            
                                                {!pblResourceHasDocument(evidence.pbl_resources) && artifactHasAttachment(evidence.artifact) &&
                                                    evidence.artifact && !isEmptyObject(evidence?.artifact) &&
                                                    <AssignmentAction isGoogleTemplate={false} currentIndex={key} evidence={evidence} pbl_resources={{}} onUpdateStatus={onUpdateStatus} />
                                                }
                                                <li>
                                                    <p className="projectComments" onClick={(e) => {
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        dispatch.dashboard.artifactAction(false);
                                                        dispatch.dashboard.commentAction({
                                                            status: true,
                                                            skills: stepData?.school_skills,
                                                            evidence: evidence
                                                        });
                                                    }}><span className="mr-2"> <i className="far fa-comments"></i></span>{evidence?.discussion_events.length} Comments</p>
                                                </li>
                                                    {/* {!pblResourceHasDocument(evidence.pbl_resources) && artifactHasAttachment(evidence.artifact) && */}
                                                    <>
                                                    {/* {evidence?.latest_progress_status?.progress_status !='review' && */}
                                                     <li>
                                                        <p className="projectartifactPreview" onClick={(e) => handleArtifact(evidence, true)}><span className="mr-2"><i className="fas fa-image"></i></span>Artifact</p>
                                                    </li>
                                                     {/* } */}
                                                       
                                                    </>
                                                {/* } */}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )
                })}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={handleSuccessMessageClose}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={handleSuccessMessageClose}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
            {addNewProject &&
                <AddNewStepModal
                    projectId={projectId}
                    modalOpened={true}
                    handleCloseModal={handleCloseModal}
                />

            }
        </div>
    )
}

export default ProjectEvidenceItem