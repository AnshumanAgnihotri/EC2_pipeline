import { isEmptyObject, isEmptyArray, getDate, getMonth, checkOverdueEvidence } from "../../utils/utils"
import { useRouter } from "next/router";

const DueEvidence = ({ upcomingDueEvidence }) => {
    const router = useRouter();
    const routerTermID = router.query.termID
    const viewEvidenceHandler = () => {
        router.push(`/term/${routerTermID}/evidence`)
    }

    return (
        <div className="col-lg-5">
            <div className="custom-card-wrap boxHeight450">
                <h2>Upcoming Due Dates</h2>
                <a onClick={viewEvidenceHandler}>View Details</a>
                <div className="upcoming-duedate-wrap">
                    {!isEmptyObject(upcomingDueEvidence) && !isEmptyArray(upcomingDueEvidence?.evidences) ? upcomingDueEvidence?.evidences.map((evidence, index) => (
                        <div className="upcoming-item" key={index}>
                            <div className="upcoming-date">
                                <span>{getDate(evidence?.due_date)}
                                </span>
                                <h2>{getMonth(evidence?.due_date)}</h2>
                            </div>
                            <div className="upcoming-item-detail">
                                <h3>{evidence.name}</h3>
                                <p>{evidence.school_class_name} / {evidence.project_name} </p>
                                <a onClick={viewEvidenceHandler}>View Details</a>
                                {/* {checkOverdueEvidence(evidence?.due_date) && <span className="text-overdue">OVERDUE</span>} */}

                            </div>
                        </div>
                    )) : <p className='noData-wrap'>No Record found</p>}
                </div>
            </div>
        </div>
    )
}

export default DueEvidence