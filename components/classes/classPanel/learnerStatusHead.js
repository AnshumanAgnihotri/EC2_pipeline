export const  LearnerStatusHead = () => {
    return (
        <ul className="learner-status">
            <li data-toggle="tooltip" data-placement="top" title="Assigned"><span className="material-icons assigned">radio_button_unchecked</span></li>
            <li data-toggle="tooltip" data-placement="top" title="In Progress"><span className="material-icons in_progress">tonality</span></li>
            <li data-toggle="tooltip" data-placement="top" title="Completed"><span className="material-icons completed">check_circle</span></li>
            <li data-toggle="tooltip" data-placement="top" title="Overdue"><span className="material-icons review">timelapse</span></li>
            <li data-toggle="tooltip" data-placement="top" title="Unread"><span className="material-icons unread_comments">announcement</span></li>
        </ul>
    )
}