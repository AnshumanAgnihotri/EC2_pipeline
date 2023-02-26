const Learner = ({portfollioInfo,handleSkillAction,handleEvidenceAction}) => {
    return (
        <div className="col-lg-8 right-side-wrap combinePortfolioRight p-0">
        <div className="subheading-wrap">
            <h2>{studentName}</h2>
        </div>
        <div className="portfolio-learner-details">
            {studentPortfollioData && !isEmptyArray(studentPortfollioData) && studentPortfollioData.map((portfollioInfo, index) => (
                <div className="portfolio-learner-1" key={index}>
                    <h3>{portfollioInfo.external_skill_name} 
                    {/* <span><i className="fas fa-check"></i>Approved</span> */}
                    </h3>
                    <ul>
                        <li>
                            <h4>Most Recent </h4>
                            <p className="skillId" onClick={() => handleSkillAction()}>{portfollioInfo?.latest_external_level?.name}</p>
                        </li>
                        <li>
                            <h4>Highest </h4>
                            <p className="skillId" onClick={() => handleSkillAction()}>{portfollioInfo?.highest_external_level?.name}</p>
                        </li>
                        <li>
                            <h4>Learner </h4>
                            <p className="skillId" onClick={() => handleSkillAction()}>{portfollioInfo?.learner_external_level?.id?.name} </p>
                        </li>
                        <li>
                            <h4>Evidence</h4>
                            <p className="outcomeSkill" onClick={() => handleEvidenceAction()}>{portfollioInfo.evidences_count}<span className="dts-icon"><i className="fas fa-cog"></i></span>Manage</p>
                        </li>
                        <li>
                            <h4>Comments</h4>
                            <p className="commentId">{portfollioInfo.comments_count}<span className="dts-icon"><i className="far fa-comments"></i></span>Read</p>
                        </li>
                        <li>
                            <h4>History</h4>
                            <p data-toggle="modal" data-target="#viewGraph"><span className="dts-icon"><i className="far fa-envelope"></i></span>View</p>
                        </li>
                    </ul>
                </div>
            ))}

        </div>
    </div>
    )
}

export default Learner