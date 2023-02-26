import { useDispatch } from "react-redux";
const SkillTableRow = ({ name,skill }) => {
    const dispatch = useDispatch();
    return (
            <div className="fd-skills d-flex">
                <div className="fd-skillItem minWidth13">
                    <span className="statusFill bg40"></span>
                    {skill?.latest_rating?.level_name ? skill?.latest_rating?.level_name : '-----'}
                    {skill?.latest_rating?.score ? ` (${skill?.latest_rating?.score})` : ''}
                    
                </div>
                <div className="fd-skillItem minWidth13">
                    <span className="statusFill bg30"></span>
                    {skill?.latest_student_rating?.level_name ? skill?.latest_student_rating?.level_name : '-----'}
                    
                </div>
                {/* <div className="fd-skillItem minWidth13"><span className="statusFill bg70"></span>Proficent </div> */}
                {/* <div className="fd-skillItem cursor-pointer" data-toggle="modal" data-target="#viewGraph"><span className="dts-icon"><i className="fas fa-chart-area"></i></span>View</div> */}
                <div className="fd-skillItem combineSkill cursor-pointer" onClick={(e) => {
                    dispatch.combinedPortfollioPage.evidenceAction({ isShowEvidence: true, evidences: skill?.evidences });
                    dispatch.combinedPortfollioPage.showCommentAction(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}><span className="dts-icon"><i className="far fa-eye"></i></span>{skill?.evidences.length}
                </div>
                <div className="fd-skillItem combineComment cursor-pointer" onClick={() => {
                    dispatch.combinedPortfollioPage.showCommentAction(true);
                    dispatch.combinedPortfollioPage.evidenceAction({ isShowEvidence: false, evidences: [] });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }} ><span className="dts-icon"><i className="far fa-comment-alt"></i></span>{skill?.comments.length}
                </div>
            </div>

    )
}

export default SkillTableRow