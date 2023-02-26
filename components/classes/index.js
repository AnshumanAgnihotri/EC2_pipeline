import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ClassProject from './classPanel/classProject';
import ProjectSideBarDetail from './classPanel/projectSideBar';
import ProjectEvidenceItem from './classPanel/projectEvidenceItem';
import Portfolio from './classPanel/portfollio'
import { isEmptyArray, isEmptyObject,evidenceListStatus } from '../../utils/utils';
import Skeleton from '@material-ui/lab/Skeleton'
import HeadMetadata from '../shared/HeadMetadata';
import EvidenceContent from './classPanel/evidenceContent';
import Comment from './classPanel/comment';
import dynamic from 'next/dynamic'
import SkillLevelItems from './classPanel/skillLevelItems';


const ArtificatPreviewSection = dynamic(
    () => import('./classPanel/ArtifactPreview'),
    { ssr: false }
)
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'


const Index = () => {
    const dispatch = useDispatch();
    const { selectedClass, classProjects } = useSelector(
        (state) => state.schoolClasses
    )
    const successMessage = useSelector(
        (state) => state.classesPage.successMessage
    )
    const handleSuccessMessageClose = () => {
        dispatch.classesPage.setSuccessMessage(null)
    }

    const [open, setOpen] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isShowProjectDetail, setIsProjectDetail] = useState(false);
    const [showPsideBar, setShowPsideBar] = useState(false);
    const [comments, setComments] = useState([]);
    const [evidenceId, setEvidenceId] = useState('');

    const { selectedTerm } = useSelector(
        (state) => state.schoolTerms
    )
    const skillLevels = useSelector((state) =>state.dashboard.skillLevels);
    useEffect(() => {
        setOpen(true)
        setIsProjectDetail(false);
        setShowPsideBar(false);
    }, [selectedClass])

    const [data, setData] = useState([]);

    const handleProjectClick = (classId, projectId) => {
        dispatch.dashboard.currentProjectActon(projectId)
        setOpen(false);
        setShowPsideBar(true);
        setData([])
        const classProject = classProjects?.class_projects.find((pclass) => pclass?.school_class?.id === classId);
       
        if (!isEmptyObject(classProject)) {
            let evidenceIds = [];
            classProject.projects.forEach(project => {
                if (project.id === projectId) {
                    project.steps.forEach(element => {
                        evidenceIds = [...evidenceIds,...element.evidence_ids];
                    })
                }
            })

            if (!isEmptyArray(evidenceIds)) {
                const params = {
                    classId: classId,
                    projectId: projectId,
                    termId: selectedTerm?.id,
                    evidenceIds: evidenceIds,
                }
                dispatch.dashboard.getProjectWithEvidence(params)
                    .then((response) => {
                        const projectEvidences = response.data;
                        const projectInfo = classProject.projects.find((project) => project?.id === projectId)
                        if (!isEmptyObject(projectInfo)) {
                            let projectStepEvidence = JSON.parse(JSON.stringify(projectInfo));
                            if (!isEmptyArray(projectEvidences) && projectStepEvidence?.steps != undefined) {
                                projectStepEvidence.school_skills = projectEvidences?.school_skills;
                                if (!isEmptyArray(projectStepEvidence?.steps)) {
                                    projectStepEvidence?.steps.map((step, key) => {
                                        // if (!isEmptyArray(step.evidence_ids)) {
                                        let stepEvidence = [];
                                        step?.evidence_ids.map((stepInfo, index) => {
                                            let evidences = projectEvidences?.evidences.filter((pEvidence) => pEvidence.id === stepInfo)
                                            if (!isEmptyObject(evidences)) {
                                                stepEvidence.push(...evidences);
                                            }
                                        })
                                        projectStepEvidence.steps[key].evidences = stepEvidence;
                                    })
                                }
                            }
                            setOpen(false);
                            setIsProjectDetail(true);
                            setShowPsideBar(true);
                            setData(projectStepEvidence);
                        }
                    }).catch((error) => {
                        console.log('eror', error);
                    })
            }
        }

    }

    const handleCloseProject = () => {
        setOpen(true);
        setIsProjectDetail(false);
        setShowPsideBar(false);
        setIsExpand(false);
    }

    const { getProjectWithEvidence } = useSelector((state) => state.loading.effects.dashboard)
    const displayComments = useSelector((state) => state.dashboard.displayComments);
    const showArtifact = useSelector((state) => state.dashboard.showArtifact);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const handleComment = (evidence, status) => {
        scrollToTop();
        dispatch.dashboard.artifactAction(false);
        dispatch.dashboard.commentAction({
            status: true,
            evidence: evidence
        });
        
    }

    const [isExpand, setIsExpand] = useState(false)
    const [artifactPreviewData, setArtifactPreviewData] = useState(false)

    const handleArtifact = (stepEvidence, status) => {
        scrollToTop();
        setName(stepEvidence?.name)
        setArtifactPreviewData(stepEvidence?.artifact)
        setEvidenceId(stepEvidence.id)
        dispatch.dashboard.commentAction({
            status: false,
            evidence: {}
        });
        dispatch.dashboard.artifactAction(status);
    }

    const handleArtifactClose = () => {
        dispatch.dashboard.commentAction({ status: false, evidence: {} });
        dispatch.dashboard.artifactAction(false);
        setName('')
        setArtifactPreviewData({})
        setEvidenceId('')
        setIsExpand(false)
    }


    const artifactUpdateHandler = (artifactData) => {
        const stepDataInfo = { ...data }
        const tempdata = data?.steps.map((step) => {
            const stepevidence = { ...step };
            const evidences = stepevidence.evidences.map((evi) => {
                const clonevidence = { ...evi }
                if (evi.id === artifactData?.evidenceId) {
                    if (artifactData?.action == 'add_update') {
                        clonevidence.artifact = artifactData?.artifact;
                        if (clonevidence.status == evidenceListStatus.assigned) {
                            clonevidence.status = evidenceListStatus.in_progress;
                        }
                    } else {
                        clonevidence.artifact = {};
                        clonevidence.status = evidenceListStatus.assigned;
                    }
                   
                }
                return clonevidence;
            })
            stepevidence.evidences = evidences
            return stepevidence
        });
        stepDataInfo.steps = tempdata;
        setData(stepDataInfo);
    }

    const updateDiscussionEvents = (commentData) => {
        const stepDataInfo = { ...data }
        const tempdata = data?.steps.map((step) => {
            const stepevidence = { ...step };
            const evidences = stepevidence.evidences.map((evi) => {
                const clonevidence = { ...evi }
                if (evi.id === commentData?.evidenceId) {
                    let comments = [...clonevidence.discussion_events];
                    if (commentData.action == 'change') {
                        comments.push(commentData.comment)
                    } else if (commentData.action == 'update') {
                        comments = comments.map((comment) => {
                            if (comment.entity.id === commentData.comment.entity.id) {
                                return { ...comment, displayable_text: commentData.comment.displayable_text }
                            }
                            return comment;
                        })
                    } else {
                        comments = comments.filter((comment) => comment.entity.id !== commentData.commentId)
                    }

                    clonevidence.discussion_events = comments;
                }
                return clonevidence;
            })
            stepevidence.evidences = evidences
            return stepevidence
        });
        stepDataInfo.steps = tempdata;
        setData(stepDataInfo);

    }

    const handleEvidenceStatus = (evidenceId) => {
        const stepDataInfo = { ...data }
        const tempdata = data?.steps.map((step) => {
            const stepevidence = { ...step };
            const evidences = stepevidence.evidences.map((evi) => {
                const clonevidence = { ...evi }
                if (evi.id === evidenceId) {
                    clonevidence.status = evidenceListStatus.in_progress
                }
                return clonevidence;
            })
            stepevidence.evidences = evidences
            return stepevidence
        });
        stepDataInfo.steps = tempdata;
        setData(stepDataInfo);
    }

    const handleCommentClose = () => {
        dispatch.dashboard.commentAction({ status: false, evidence: {},skills:{} });
        dispatch.dashboard.artifactAction(false);
        dispatch.dashboard.skillLevelAction({isShow:false,name:'',levels:{}})
    }
    const handleCloseLevels = () => {
        dispatch.dashboard.skillLevelAction({isShow:false,name:'',levels:{}})
        dispatch.dashboard.commentAction({ status: false, evidence: {},skills:{} });
        dispatch.dashboard.artifactAction(false);
    }

    const handleCloseEvidence = () => {
        const params = { isShow: false, name: '', description: '',pbl_resources:[] }
        dispatch.dashboard.showStepEvidenceDescriptionAction(params)
        setIsExpand(false);
    }


    if (getProjectWithEvidence)
        return [...Array(10).keys()].map((item) => (
            <>
                <Skeleton
                    key={item}
                    height={100}
                    style={{ marginBottom: '20px' }}
                />
            </>
        ))

    return (
        <>
            <HeadMetadata metadata={{ title: 'LiFT Learning | Class' }} />
            <div className="container-fluid">
                <div className="row">
                    <div className={`${isExpand ? 'col-lg-12':'col-lg-4'} left-side-wrap learner-leftSide`}>
                        <ClassProject
                            selectedClass={selectedClass}
                            handleProjectClick={handleProjectClick}
                            classProjects={classProjects}
                            open={open} />
                
                {skillLevels?.isShow && 
                    <SkillLevelItems
                        skillLevels={skillLevels}
                        handleCloseLevels={handleCloseLevels}
                    /> 
                    }

                        {/* <!-- Comments start --> */}
                        {displayComments.status &&
                            <Comment
                                open={displayComments.status}
                                onClose={() => handleCommentClose()}
                                updateDiscussionEvents={updateDiscussionEvents} />}
                        {/* <!-- Comments End --> */}
                        {/* <!-- Artifact start --> */}
                        {showArtifact &&
                            <ArtificatPreviewSection
                                name={name}
                                evidenceID={evidenceId}
                                open={showArtifact}
                                artifact={artifactPreviewData}
                                onClose={() => handleArtifactClose()}
                                setIsExpand={setIsExpand}
                                isExpand={isExpand}
                                artifactUpdateHandler={artifactUpdateHandler}
                            />
                        }
                        {/* <!-- Artifact End --> */}

                        {/* <!-- Project details start --> */}

                        <ProjectSideBarDetail
                            onClose={handleCloseProject}
                            open={showPsideBar}
                            name={data?.name}
                            description={data?.description}
                            setIsExpand={setIsExpand}
                            isExpand={isExpand} />
                        {/* <!-- Project details End --> */}
                        {/* <!-- Evidence Content start --> */}
                        <EvidenceContent 
                        setIsExpand={setIsExpand}
                        isExpand={isExpand}
                        onClose={handleCloseEvidence}
                        />
                        {/* <!-- Evidence Content End --> */}
                    </div>

                    <div className="col-lg-8 right-side-wrap p-0" style={{display:isExpand ? 'none':'block'}}>
                        {open && <Portfolio open={open} name={name} description={description} />}
                        <ProjectEvidenceItem
                            show={isShowProjectDetail}
                            stepData={data}
                            handleComment={handleComment}
                            handleArtifact={handleArtifact}
                            onUpdateStatus={handleEvidenceStatus}
                        />
                    </div>
                </div>
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
        </>
    )
}

export default Index;