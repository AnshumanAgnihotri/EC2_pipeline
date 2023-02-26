
import { isEmptyArray } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LearnerStatusHead } from './learnerStatusHead'


const ClassProject = ({selectedClass, classProjects, open, handleProjectClick }) => {
    const [clickedClassId, setClickedClassId] = useState('');
    const [isCollaps, setIsCollaps] = useState(false);
    // const { selectedClass } = useSelector(
    //     (state) => state.schoolClasses
    // )
    useEffect(() => {
        setIsCollaps(true);
        setClickedClassId(selectedClass?.id);
    }, [selectedClass])

    const getClassProject = (classId) => {
        if (clickedClassId === classId) {
            setClickedClassId('');
            setIsCollaps(false);
        } else {
            setClickedClassId(classId);
            setIsCollaps(true);
        }
    }
    
    return (
        <>
            <div className="heading-wrap">
                <h2> Classes </h2>
                <LearnerStatusHead />
            </div>
            <div id="projectAccordion" className="scrollBar learnerMiddleHeight" style={{ display: open ? 'block' : 'none' }}>
                {!isEmptyArray(classProjects?.class_projects) && classProjects?.class_projects?.filter((fclass) => fclass?.school_class?.id === selectedClass?.id).map((pclass, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-header">
                                <a
                                    className={pclass?.school_class?.id == clickedClassId ? 'card-link' : 'card-link collapsed'}
                                    data-toggle="collapse"
                                    aria-expanded={pclass?.school_class?.id == clickedClassId}
                                    onClick={getClassProject.bind(
                                        this,
                                        pclass?.school_class?.id,
                                    )}
                                >
                                    <span className="span-text" title={pclass?.school_class?.name}>{pclass?.school_class?.name}</span>
                                    <div className="learnerStatus">
                                        {/* <span>B+</span>
                                        <span>On Track</span> */}
                                    </div>
                                </a>
                            </div>
                            <div
                                id={pclass?.school_class?.id}
                                aria-expanded={isCollaps}
                                className={
                                    pclass?.school_class?.id === clickedClassId && isCollaps
                                        ? 'collapse show'

                                        : 'collapse'
                                }
                                data-parent="#projectAccordion">
                                <div className="card-body sub-card-body">
                                    {!isEmptyArray(pclass?.projects) && pclass.projects.map((project, key) => (
                                        <div className="learner-item1" key={`learner-item1-${key}`}>
                                            <span className="span-text" title={project?.name} onClick={() => handleProjectClick(pclass?.school_class?.id, project?.id)}>{project?.name}</span>
                                            <ul className="learner-status">
                                                <li><span className="bg-portfolio">{project?.total?.assigned_count}</span></li>
                                                <li><span className="bg-progress">{project?.total?.in_progress_count}</span></li>
                                                <li><span className="bg-completed">{project?.total?.completed_count}</span></li>
                                                <li><span className="bg-review">{project?.total?.review_requests_count}</span></li>
                                                <li><span className="bg-unread">{project?.total?.divrevise_count}</span></li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default ClassProject