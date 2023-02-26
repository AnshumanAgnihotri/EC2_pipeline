

const evidenceStatusItem = ({ assigned, in_progress, completed, overdue }) => {
    return (
        <ul className="learner-status">
            <li><span className="bg-portfolio">{assigned}</span></li>
            <li><span className="bg-progress">{in_progress}</span></li>
            <li><span className="bg-completed">{completed}</span></li>
            <li><span className="bg-review">{overdue}</span></li>
            {/* <li>
            <span className="bg-unread">1</span>
          </li> */}
        </ul>
    )
}

export default evidenceStatusItem;