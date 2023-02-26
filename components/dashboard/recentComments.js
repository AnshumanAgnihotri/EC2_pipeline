import { isEmptyObject, isEmptyArray, getCreatedAtDate } from "../../utils/utils"
import ShowMoreText from "react-show-more-text";


const RecentComments = ({recentComments}) => {
    return (
        <div className="row">
            <div className="col-lg-7">
                <div className="custom-card-wrap boxHeight300">
                    <h2>Recent Comments</h2>
                    <div className="recent-comments-wrap">
                    {!isEmptyObject(recentComments) && !isEmptyArray(recentComments?.recent_comments) ? recentComments?.recent_comments.map((comment,index) => (
                        <div className="recent-comment-item" key={index}>
                            <h3>{comment?.commenter_name}<small>{getCreatedAtDate(comment?.created_at)}</small></h3>
                            <span>{comment?.commenter_type}</span>
                            <p>
                            
                                    <p> <ShowMoreText
                                        lines={2}
                                        more="Read more"
                                        less="Show less"
                                        anchorClass=""
                                        expanded={false}
                                    >
                                        {comment?.comment}
                                    </ShowMoreText></p>
                                
                            {/* <a href="#" className="link-viewAll">Read More</a> */}
                            </p>
                        </div>
                    )) :<p className='noData-wrap'>No Record found</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentComments