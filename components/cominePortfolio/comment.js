const Comment = () => {
    <div class="comment-box" style={{ display: 'none' }}>
    <div class="heading-wrap">
        <h2>Comments</h2>
        <span class="closeDiv closeComments"><i class="fas fa-times"></i></span>
    </div>
    <div class="comment-wrap">
        <div class="comments-group scrollBar">
            <div class="comment-view-item">
                <div class="comment-head">
                    <div class="d-flex d-flex flex-column">
                        <h4>Sarah Hale<small>You</small></h4>
                        <span>Teacher</span>
                    </div>
                    <span class="commentDate">2 days ago</span>
                </div>
                <div class="comment-body">
                    <p>I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest
                        library/framework.<span id="dots">...</span><span id="more">
                            But the fundamentals are what stay constant. I couldn’t agree more with this. Everything moves
                            so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay
                            constant.I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest
                            library/framework. But the fundamentals are what stay constant.</span>
                        <button onclick="myFunction()" id="myBtn">Read more</button>
                    </p>
                    <div class="comments-textarea-box" style={{ display: 'none' }}>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <textarea class="form-control" value="">I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework.But the fundamentals are what stay constant. I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.</textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button type="button" class="btn btn-custom">Submit</button>
                                <button type="button" class="btn btn-black" id="cancelComment">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-bottom">
                    <ul>
                        <li><span><i class="fas fa-trash-alt"></i></span>Delete</li>
                        <li id="editComment"><span><i class="fas fa-pencil-alt"></i></span>Edit</li>
                    </ul>
                </div>
            </div>
            <div class="comment-view-item">
                <div class="comment-head">
                    <div class="d-flex d-flex flex-column">
                        <h4>Abby Forbes</h4>
                        <span>Student</span>
                    </div>
                    <span class="commentDate">3 days ago</span>
                </div>
                <div class="comment-body">
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
        <div class="comment-type-box filter-wrap">
            <div class="row">
                <div class="col-lg-7">
                    <div class="form-group">
                        <select class="form-control">
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
                <div class="col-lg-12">
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Write a comments"></textarea>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="form-group buttonBox d-flex justify-content-end">
                        <button type="button" class="btn btn-custom"><i class="fas fa-paper-plane"></i>Send</button>
                        <button type="button" class="btn btn-custom" id="btnCancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default Comment