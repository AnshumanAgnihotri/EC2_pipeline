const evidenceStatusHead = () => {
    return (
        <ul className="learner-status">
            <li data-toggle="tooltip" data-placement="top" title="Assigned">
                <span className="material-icons icon-assigned">radio_button_unchecked</span>
            </li>
            <li data-toggle="tooltip" data-placement="top" title="In Progress">
                <span className="material-icons icon-progress">tonality</span>
            </li>
            <li data-toggle="tooltip" data-placement="top" title="Completed">
                <span className="material-icons icon-completed">check_circle</span>
            </li>
            <li data-toggle="tooltip" data-placement="top" title="Overdue">
                <span className="material-icons icon-overdue">timelapse</span>
            </li>
            {/* <li data-toggle="tooltip" data-placement="top" title="Unread">
                <span className="material-icons icon-unread">announcement</span>
              </li> */}
        </ul>
    )
}

export default evidenceStatusHead;