
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import ShowMoreText from "react-show-more-text";

const Index = ({ }) => {
    
    return (
        <div id="commentBox1" className="comment-box" style={{ display: 'none' }}>
        <div className="heading-wrap">
            <h2>Comments</h2>
            <span id="close1" className="closeDiv" ><i className="fas fa-times"></i></span>
        </div>
        <div className="comment-wrap">
            <div className="comments-group scrollBar">
                <div className="comment-view-item">
                    <div className="comment-head">
                        <div className="d-flex d-flex flex-column">
                            <h4>Sarah Hale<small>You</small></h4>
                            <span>Teacher</span>
                        </div>
                        <span className="commentDate">2 days ago</span>
                    </div>
                    <div className="comment-body">
                        <p>I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest
                            library/framework.<span id="dots">...</span><span id="more">
                                But the fundamentals are what stay constant. I couldn’t agree more with this. Everything moves
                                so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay
                                constant.I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest
                                library/framework. But the fundamentals are what stay constant.</span>
                            <button onclick="myFunction()" id="myBtn">Read more</button>
                        </p>
                        <div className="comments-textarea-box" style={{ display: "none" }}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <textarea className="form-control" value="">I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework.But the fundamentals are what stay constant. I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.</textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button type="button" className="btn btn-custom">Submit</button>
                                    <button type="button" className="btn btn-black" id="cancelComment">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-bottom">
                        <ul>
                            <li><span><i className="fas fa-trash-alt"></i></span>Delete</li>
                            <li id="editComment"><span><i className="fas fa-pencil-alt"></i></span>Edit</li>
                        </ul>
                    </div>
                </div>
                <div className="comment-view-item">
                    <div className="comment-head">
                        <div className="d-flex d-flex flex-column">
                            <h4>Abby Forbes</h4>
                            <span>Student</span>
                        </div>
                        <span className="commentDate">3 days ago</span>
                    </div>
                    <div className="comment-body">
                        <p>I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest
                            library/framework.<span id="dots1">...</span><span id="more1">
                                But the fundamentals are what stay constant. I couldn’t agree more with this. Everything moves
                                so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay
                                constant.I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest
                                library/framework. But the fundamentals are what stay constant.</span>
                            <button onclick="myFunction2()" id="myBtn2">Read more</button>
                        </p>
                    </div>
                </div>
            </div>
            <div className="comment-type-box filter-wrap">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="form-group">
                            <select className="form-control">
                                <option value="0">Skills</option>
                                <option value="1">Writing</option>
                                <option value="2">Historical Inquiry</option>
                                <option value="3">IL.1.1 - Setting goals</option>
                                <option value="4">IL.1.2 - Setting goals</option>
                                <option value="5">Academic Behaviors</option>
                                <option value="5">Social Skills and Responsibility</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <textarea className="form-control" placeholder="Write a comments"></textarea>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group buttonBox d-flex justify-content-end">
                            <button type="button" className="btn btn-custom"><i className="fas fa-paper-plane"></i>Send</button>
                            <button type="button" className="btn btn-custom" id="btnCancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Index