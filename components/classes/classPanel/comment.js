import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmptyArray } from '../../../utils/utils';
import ShowMoreText from "react-show-more-text";
import { useForm } from "react-hook-form";
import SkeletonLoader from '../../shared/skeletonLoader';
import Moment from 'react-moment';

const Comment = ({ open, onClose, updateDiscussionEvents }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const currentclass = useSelector((state) => state.schoolClasses.selectedClass);
    const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm);
    const isLoading = useSelector((state) => state.loading.global)
    const [show, setShow] = useState('');
    const [updatedComment, setUpdatedComment] = useState('');
    const [commentSkillOptions, setCommentSkillsOptions] = useState([]);
    const [contentType, setContentType] = useState(0);
    const displayComments = useSelector((state) => state.dashboard.displayComments);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const user = useSelector((state) => state.user);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (displayComments) {
            setComments(displayComments?.evidence?.discussion_events);
            const skills = [];
            Object.keys(displayComments?.skills).forEach(function(key) {
                console.log(key, displayComments.skills[key]);
                const found = displayComments?.evidence.skills.some(el => el.skill_id === key);
                if (found) skills.push(displayComments.skills[key]);
            });
            setCommentSkillsOptions(skills);

        }
    },[displayComments]);
    console.log('setCommentSkillsOptions',commentSkillOptions);
    const onSubmit = (e) => {
        const finaldata = {
            termId: selectedTerm?.id,
            params: {
                evidence_id: displayComments?.evidence?.id,
                school_class_id: currentclass?.id,
                discussion_comment: {
                    content: content,
                    type: contentType,
                },
            }
        }
        dispatch.classesPage.addCommentbyEvidenceID(finaldata).then((response) => {
            setContentType('');
            setContent('');
            const currentComment = {
                displayable_text: content,
            }
            const commentsdata = {
                ...currentComment, ...response.comment
            }
            setComments((prevComment) => [
                ...prevComment,
                commentsdata
            ])
            const comment = {
                action: 'change',
                comment: commentsdata,
                evidenceId: displayComments?.evidence?.id
            }
            updateDiscussionEvents(comment)
            dispatch.dashboard.addCommentAction(comment)
        })
    }

    const contentTypeHandler = (e) => {
        setContentType(e.target.value);
        // setIsSkillVisible((true));
    }

    const editCommentContentHandler = (e, index) => {
        const editComments = comments[index];
        setUpdatedComment(editComments?.displayable_text)
        setShow(index);
    }

    const deleteCommentHandler = (index, commentId) => {
        const params = {
            termId: selectedTerm?.id,
            commentId: commentId
        }
        dispatch.classesPage.deleteEvidenceDiscussionEventById(params)
            .then((response) => {
                if (response.status) {
                    const filterComments = comments.filter((item, key) => key !== index)
                    setComments(filterComments);
                    const comment = {
                        action: 'delete',
                        commentId: commentId,
                        evidenceId: displayComments?.evidence?.id
                    }
                    updateDiscussionEvents(comment)
                }
            }).catch((error) => {
                console.log('error', error);
            })
    }

    const updateCommentHandler = (commentId, index) => {
        const params = {
            termId: selectedTerm?.id,
            commentId: commentId,
            params: {
                discussion_comment: {
                    content: updatedComment,
                    type: contentType,
                },
            }
        }
        dispatch.classesPage.updateEvidenceDiscussionEventById(params)
            .then((response) => {
                setShow('')
                if (response.status) {
                    let updatedResponse = {};
                    const filterComments = comments.map((comment, key) => {
                        if (key === index) {
                            const currentComment = {
                                displayable_text: updatedComment,
                            }
                            const commentsdata = {
                                ...currentComment, ...response.comment
                            }
                            updatedResponse = commentsdata;
                            return commentsdata
                        }
                        return comment
                    })

                    setComments(filterComments);
                    const comment = {
                        action: 'update',
                        comment: updatedResponse,
                        evidenceId: displayComments?.evidence?.id
                    }
                    updateDiscussionEvents(comment)
                    setShow('')
                }
            })
    }
    return (
        <div id="commentBox1" className="comment-box" style={{ display: open ? 'block' : 'none' }}>
            <div className="heading-wrap">
                <h2>Comments</h2>
                <span id="close1" className="closeDiv" onClick={() => {
                    dispatch.dashboard.commentAction({ status: false, evidence: {},skills:{} });
                    dispatch.dashboard.skillLevelAction({isShow:false,name:'',levels:{}})
                }} ><i className="fas fa-times"></i></span>
            </div>
            
            {isLoading && <SkeletonLoader height={70} width={500} margin={'10px'} />}
            <div className="comment-wrap scrollBar learnerMiddleHeight" style={{ display: !isLoading ? 'block' : 'none' }}>
                <div className="comments-group scrollBar">
                <span className='docHead'>{displayComments?.evidence?.name}</span>
                    {!isEmptyArray(comments) ? comments.map((comment, index) => (
                        <div className="comment-view-item" key={index.toString()}>
                            <div className="comment-head">
                                <div className="d-flex d-flex flex-column">
                                    <h4>{comment?.author ? `${comment?.author?.user?.first_name} ${comment?.author?.user?.last_name}` : ''} {user?.user_ids == comment?.author?.user?.id && <small>You</small>}</h4>
                                    {user?.user_ids !== comment?.author?.user?.id && <span>Teacher</span>}
                                </div>
                                <span className="commentDate">
                                    <Moment fromNow>{comment?.entity?.created_at}</Moment></span>
                            </div>
                            <div className="comment-body">
                                {show !== index &&
                                    <p> <ShowMoreText
                                        lines={2}
                                        more="Read more"
                                        less="Show less"
                                        anchorclassName=""
                                        expanded={false}
                                    >
                                        {comment?.displayable_text}
                                    </ShowMoreText></p>
                                }
                                <div className="comments-textarea-box" style={{ display: show === index ? 'block' : 'none' }}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <textarea className="form-control" onChange={(e) => setUpdatedComment(e.target.value)} value={updatedComment}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <button type="button" className="btn btn-custom" onClick={() => updateCommentHandler(comment?.entity?.id, index)}>Submit</button>
                                            <button type="button" className="btn btn-black" onClick={() => setShow('')}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <p>{comment?.entity?.comment_type}</p> */}
                            <div className="comment-bottom">
                                <ul>
                                    {comment?.author?.user?.id === user?.user_ids && comment?.entity?.comment_type && <li onClick={(e) => deleteCommentHandler(index, comment?.entity?.id)}><span><i className="fas fa-trash-alt"></i></span>Delete</li>}
                                    {comment?.author?.user?.id === user?.user_ids &&  comment?.entity?.comment_type && <li onClick={(e) => editCommentContentHandler(e, index)}><span><i className="fas fa-pencil-alt"></i></span>Edit</li>}
                                </ul>
                            </div>
                        </div>
                    )) : <p className="noData-wrap">No Record found</p>}
                </div>
                <div className="comment-type-box filter-wrap">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <select className="form-control"
                                        value={contentType}
                                        onChange={(e) => contentTypeHandler(e)}
                                    >
                                        <option value={'0'}>General</option>
                                         {commentSkillOptions && commentSkillOptions.length > 0 ?
                                        commentSkillOptions.map(
                                            (item, i) => {
                                                return (
                                                    <option key={`schoolSkills-option${i}`} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                )
                                            }
                                        ) : ''
                                    } 
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <textarea
                                        {...register("comment", { required: true, })}
                                        className="form-control"
                                        placeholder="Write a comments"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                    {errors.comment && errors.comment.type === "required" && (
                                        <p role="alert" className="errorMsg text-danger">This field is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="buttonBox d-flex justify-content-end">
                                    <button type="submit" className="btn btn-custom"><i className="fas fa-paper-plane"></i>Send</button>
                                    <button type="button" className="btn btn-custom" onClick={onClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Comment