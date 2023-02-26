import { isEmptyObject, isEmptyArray } from "../../utils/utils"

const RecentProject = ({recentProjects}) => {
    return (
        <div className="col-lg-7">
        <div className="custom-card-wrap boxHeight450">
            <h2>Recent Projects</h2>
            <div className="recent-projects-wrap">
                {!isEmptyObject(recentProjects) && !isEmptyArray(recentProjects?.projects) ? recentProjects?.projects.map((project,index) => (
                <div className="recent-projects-item" key={index.toString()}>
                    <h3>{project?.project_name}</h3>
                    <div className="d-flex justify-content-between">
                        <p>{project?.school_class_name}</p>
                        <ul>
                            <li>{project?.revision_count} revisions</li>
                            <li>{project?.review_requests} reviews</li>
                            <li>{project?.overdue} overdue</li>
                        </ul>
                    </div>
                </div>
                )):<p className='noData-wrap'>No Record found</p>}
            </div>
        </div>
    </div>
    )
}

export default RecentProject