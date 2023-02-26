
import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { evidenceListStatus } from '../../../utils/utils';
import Link from 'next/link'

const AssignmentAction = (props) => {
    const { isGoogleTemplate, currentIndex, evidence, pbl_resources, onUpdateStatus } = props;
    console.log('evidence', evidence);
    const dispatch = useDispatch();
    const currentclass = useSelector((state) => state.schoolClasses.selectedClass);
    const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
    const [pblresources, setPblresources] = useState({ ...pbl_resources });
    const [selectedIndex, setSelectedIndex] = useState('');
    const [latest_progress_status, setLatestProgress] = useState(evidence?.latest_progress_status?.progress_status);
    const startAssignments = (index) => {
        setSelectedIndex(index);
        const params = {
            termId: selectedTerm?.id,
            schoolClassId: currentclass?.id,
            evidenceId: evidence?.id
        }
        dispatch.dashboard.startAssignment(params)
            .then((response) => {
                if (response.status == 'success') {
                    setPblresources(response.pbl_resource);
                    setSelectedIndex('');
                }
            }).catch((error) => {
                setSelectedIndex('');
            })
    }
    const sendReviewHandler = (index) => {
        setSelectedIndex(index);
        const params = {
            termId: selectedTerm?.id,
            schoolClassId: currentclass?.id,
            evidenceId: evidence?.id
        }
        dispatch.dashboard.sendAssignmentForReview(params)
            .then((response) => {
                if (response.status == 'success') {
                    const rs = response.pbl_resource;
                    setPblresources(response.pbl_resource);
                    onUpdateStatus(evidence?.id)
                    setSelectedIndex('');
                    setLatestProgress(evidenceListStatus.review);
                }
            }).catch((error) => {
                setSelectedIndex('');
            })
    }

    return (
        <>
            <div className="linksBox">
                {(() => {
                    let isdisablelink = false;
                    var action = '';
                    if (evidence?.status != evidenceListStatus.completed) {
                        if (isGoogleTemplate) {
                            if (pblresources && pblresources.document_id !== null) {

                                if (pblresources.status == '' && pblresources.is_template === true && pblresources.document_id !== null) {
                                    isdisablelink = true;
                                    action = <button class={`btn-assign ${currentIndex === selectedIndex} ? 'disabled':''`} onClick={startAssignments.bind(this, currentIndex)}><span><i class="fas fa-paper-plane"></i></span>{currentIndex === selectedIndex ? 'Assigning... ' : 'Start Assignment'}</button>;
                                } else if (pblresources.status == evidenceListStatus.in_progress && !pblresources.is_template && pblresources.document_id !== null) {
                                    isdisablelink = false;
                                    action = <button class={`btn-assign sendReviewColor ${currentIndex === selectedIndex} ? 'disabled':''`} onClick={sendReviewHandler.bind(this, currentIndex)}><span><i class="fas fa-paper-plane"></i></span>{currentIndex === selectedIndex ? 'Sending... ' : 'Send for review'}</button>
                                } else if ((pblresources.status == evidenceListStatus.in_review && !pblresources.is_template && pblresources.document_id !== null)) {
                                    isdisablelink = false;
                                    action = <button class="btn-assign underReviewColor"><span className="material-icons">radio_button_checked</span>Under Review</button>
                                }
                                return (
                                    <>
                                        <div class="linksBox">
                                            <Link href={pblresources?.url}>
                                                <a className={`feedbackLink  ${isdisablelink ? 'btn-disabled' : ''}`} disabled={isdisablelink} title={pblresources.title} target="_blank"><span><img src="/images/Vector.png" alt="resource link" /></span>{pblresources?.title.substr(0, 15)}...</a>
                                            </Link>
                                            {action}
                                        </div>
                                    </>
                                )
                            }

                        } else {
                            console.log('latest_progress_status', latest_progress_status)
                            if (latest_progress_status == evidenceListStatus.review || evidence.status == evidenceListStatus.in_review) {
                                return <button class="btn-assign underReviewColor"><span className="material-icons">radio_button_checked</span>Under Review</button>
                            } else {
                                let heading = 'Send For Review';
                                if (latest_progress_status == evidenceListStatus.revise) {
                                    heading = 'Submit Revision';
                                }
                                return (
                                    <>
                                        {/* {latest_progress_status == evidenceListStatus.revise &&
                                            // <span className='revisetatus'>{evidenceListStatus.revise.toUpperCase()}</span>
                                        } */}
                                        <button class={`btn-assign sendReviewColor ${currentIndex === selectedIndex} ? 'disabled':''`} onClick={sendReviewHandler.bind(this, currentIndex)}><span><i class="fas fa-paper-plane"></i></span>{currentIndex === selectedIndex ? 'Sending... ' : heading}</button>
                                    </>
                                )


                            }
                        }
                    }

                })()}
            </div>
        </>
    )
}

export default AssignmentAction
