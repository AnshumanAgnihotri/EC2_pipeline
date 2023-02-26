import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import useDrivePicker from 'react-google-drive-picker'
import ModalShowSkills from './modalShowSkills.js'
import Modal from "react-bootstrap/Modal";
// import { data } from 'jquery'
export default function ModalFeedback({
  open,
  children,
  onClose,
  evidenceId,
  bodyObject,
  classid,
}) {
  // alert(evidenceId)
  const dispatch = useDispatch()
  if (!open) return null
  const [isskillVisible, setIsSkillVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDocsUpdateVisible, setIsDocsUpdateVisible] = useState(false)
  const [isActionButtonVisible, setIsActionButtonVisible] = useState(true)

  const [isdocsVisible, setIsDocsVisible] = useState(false)

  const [contentType, setContentType] = useState()
  const [projectName, setprojectName] = useState()
  const [serviceURL, setServiceURL] = useState()
  const [evidenceScore, setEvidenceScore] = useState([])
  // const [artifactImagePath, setArtifactImagePath] = useState("");
  const [evidenceName, setevidenceName] = useState('')
  const [evidenceData, setevidenceData] = useState([])
  const [indexData, setIndexData] = useState()
  const [evidenceID, setevidenceID] = useState(evidenceId)
  const [activeStatus, setactiveStatus] = useState('')
  const [backactiveStatus, setbackactiveStatus] = useState('')
  const [evidenceStatus, setevidenceStatus] = useState()
  const [isOpenComment, setIsOpenComment] = useState(false)
  const [content, setContent] = useState('')
  const [isOpenSkills, setIsOpenSkills] = useState(false)
  // const [sendRequest, setSendRequest] = useState(false)
  // const [isOpen, setIsOpen] = useState(false)
  const [ddlvalue, setDdlValue] = useState()
  const [metaLabelAttributes, setMetaLabelAttributes] = useState({})
  const [metaStatusAttributes, setMetaStatusAttributes] = useState({})
  const [dataAttributes, setDataAttributes] = useState({})
  // const [openPicker, data, authResponse] = useDrivePicker()
  const [openPicker, data] = useDrivePicker()
  const style = {
    overflow: 'hidden',
    height: isVisible || isdocsVisible ? '100%' : '0px',
    transition: '2s',
  }

  // displaying discussion listing data here
  useEffect(() => {
    dispatch.classesPage.getEvidenceDiscussionEvent({
      params: {
        evidenceid: evidenceId,
      },
    })
  }, [evidenceId])

  const evidenceFeedback = useSelector(
    (state) => state.classesPage.evidencediscussiondata
  )
  useEffect(() => {
    setevidenceData(evidenceFeedback)
  }, [evidenceFeedback])

  function artifactevents() {
    if (contentType === 'evidence_url') {
      setIsVisible((prev) => !prev)
    } else if (contentType === 'google_doc') {
      setIsDocsVisible((prev) => !prev)
      // callGoogleDocs();
    }
  }
  function callArtifactDocs() {
    handleOpenPicker()
    // window.location =serviceURL;
  }
  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_BROWSER_CLIENT_ID,
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_BROWSER_API_KEY,
      viewId: 'DOCS',
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    })
  }
  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i.name))
    }
  }, [data])
  function updateClickButton() {
    setIsDocsUpdateVisible((prev) => !prev)
    setIsActionButtonVisible((prev) => !prev)
  }

  function showSkill() {
    setIsOpenSkills(true)
  }
  // calling API and get data by EvidenceID
  useEffect(() => {
    dispatch.classesPage.getFeedbackDetailsByevidenceID({
      evidenceid: evidenceID,
    })
  }, [evidenceID])
  // get data after calling API getFeedbackDetailsByevidenceID
  const evidenceFeedbackDetails = useSelector(
    (state) => state.classesPage.evidenceFeedbackDetal
  )

  useEffect(() => {
    if (evidenceFeedbackDetails) {
      setDataAttributes({
        id: evidenceFeedbackDetails.data.evidence.id,
        name: evidenceFeedbackDetails.data.evidence.name,
        locked: evidenceFeedbackDetails.data.evidence.locked,
        is_locked: evidenceFeedbackDetails.data.evidence.is_locked,
        show_levels: evidenceFeedbackDetails.data.evidence.show_levels,
        events: [evidenceFeedbackDetails.data.evidence.events],
        allow_to_add_comment:
          evidenceFeedbackDetails.data.evidence.allow_to_add_comment,
        add_comment_enabled:
          evidenceFeedbackDetails.data.evidence.add_comment_enabled,
        add_comment_options: [
          evidenceFeedbackDetails.data.evidence.add_comment_options,
        ],
        has_resource_template:
          evidenceFeedbackDetails.data.evidence.has_resource_template,
        google_resource_status:
          evidenceFeedbackDetails.data.evidence.google_resource_status,
        status: evidenceFeedbackDetails.data.evidence.status,
        step: evidenceFeedbackDetails.data.evidence.step,
        target: evidenceFeedbackDetails.data.evidence.target.name,
        progress_status: evidenceFeedbackDetails.data.evidence.progress_status,
        has_artifact: evidenceFeedbackDetails.data.evidence.has_artifact,
        enabled_action_buttons:
          evidenceFeedbackDetails.data.evidence.enabled_action_buttons,
        google_resource: {
          google_resource:
            evidenceFeedbackDetails.data.evidence.google_resource,
        },
        has_skill_list: evidenceFeedbackDetails.data.evidence.has_skill_list,
        is_completed: evidenceFeedbackDetails.data.evidence.is_completed,
        score_rating_enabled:
          evidenceFeedbackDetails.data.evidence.score_rating_enabled,
        add_to_portfolio_instructions:
          evidenceFeedbackDetails.data.evidence.add_to_portfolio_instructions,
        add_to_portfolio_title:
          evidenceFeedbackDetails.data.evidence.add_to_portfolio_title,
        evidence_score_table_props:
          evidenceFeedbackDetails.data.evidence.evidence_score_table_props,
      })
      setMetaLabelAttributes({
        add_comment: evidenceFeedbackDetails.meta.labels.add_comment,
        skill_levels: evidenceFeedbackDetails.meta.labels.skill_levels,
        cancel: evidenceFeedbackDetails.meta.labels.cancel,
        send: evidenceFeedbackDetails.meta.labels.send,
        edited: evidenceFeedbackDetails.meta.labels.edited,
        general: evidenceFeedbackDetails.meta.labels.general,
        view: evidenceFeedbackDetails.meta.labels.view,
        go_to_project: evidenceFeedbackDetails.meta.labels.go_to_project,
        unlock_requested_prompt:
          evidenceFeedbackDetails.meta.labels.unlock_requested_prompt,
        lock_prompt: evidenceFeedbackDetails.meta.labels.lock_prompt,
        status_legent_not_started:
          evidenceFeedbackDetails.meta.labels.status_legent_not_started,
        completed_prompt_portfolio:
          evidenceFeedbackDetails.meta.labels.completed_prompt_portfolio,
        completed_prompt: evidenceFeedbackDetails.meta.labels.completed_prompt,
        revise_prompt: evidenceFeedbackDetails.meta.labels.revise_prompt,
        status_legend_started:
          evidenceFeedbackDetails.meta.labels.status_legend_started,
        status_legend_review:
          evidenceFeedbackDetails.meta.labels.status_legend_review,
        review_prompt: evidenceFeedbackDetails.meta.labels.review_prompt,
        no_artifact_prompt:
          evidenceFeedbackDetails.meta.labels.no_artifact_prompt,
        update_prompt: evidenceFeedbackDetails.meta.labels.update_prompt,
        revise_by_learner:
          evidenceFeedbackDetails.meta.labels.revise_by_learner,
        progress_status_revision:
          evidenceFeedbackDetails.meta.labels.progress_status_revision,
        unlock_requested: evidenceFeedbackDetails.meta.labels.unlock_requested,
      })
      setMetaStatusAttributes({
        locked: evidenceFeedbackDetails.meta.evidence_statuses.locked,
        assigned: evidenceFeedbackDetails.meta.evidence_statuses.assigned,
        in_progress: evidenceFeedbackDetails.meta.evidence_statuses.in_progress,
        completed: evidenceFeedbackDetails.meta.evidence_statuses.completed,
        in_portfolio:
          evidenceFeedbackDetails.meta.evidence_statuses.in_portfolio,
        unlock_requested:
          evidenceFeedbackDetails.meta.evidence_progress_statuses
            .unlock_requested,
        review: evidenceFeedbackDetails.meta.evidence_progress_statuses.review,
        revise: evidenceFeedbackDetails.meta.evidence_progress_statuses.revise,
        unread_comments:
          evidenceFeedbackDetails.meta.evidence_progress_statuses
            .unread_comments,

        in_review: evidenceFeedbackDetails.meta.pbl_resource_statuses.in_review,
      })
    }
    console.log(metaStatusAttributes)
    bodyObject &&
      bodyObject.map((checkEvidence, index) => {
        const count = bodyObject.length
        if (checkEvidence.evidence_id.toString() === evidenceID.toString()) {
          setevidenceData(evidenceFeedback)
          setevidenceName(checkEvidence.evidence_name)
          setEvidenceScore(checkEvidence.evidence_scores)
          setContentType(checkEvidence.artifact.content_type)
          setServiceURL(checkEvidence.artifact.service_url)
          setevidenceStatus(checkEvidence.evidence_status)
          setprojectName(checkEvidence.project_name)
          setIndexData(index)

          count === index + 1
            ? setactiveStatus('disabled')
            : setactiveStatus('')
          index === 0
            ? setbackactiveStatus('disabled')
            : setbackactiveStatus('')
        }

        return null
      })
  }, [evidenceFeedbackDetails])

  const [nextEvidence, setNextEvidence] = useState()
  const [prevEvidence, setPrevEvidence] = useState()
  useEffect(() => {
    bodyObject &&
      bodyObject.filter((item, index) => {
        if (index === indexData + 1) setNextEvidence(item.evidence_name)

        if (index === indexData - 1) setPrevEvidence(item.evidence_name)

        return null
      })
  }, [evidenceID])

  function clickNext() {
    bodyObject &&
      bodyObject.map((checkEvidence, index) => {
        const count = bodyObject.length
        if (index === indexData + 1) {
          setevidenceID(checkEvidence.evidence_id)
          setevidenceName(checkEvidence.evidence_name)
          setIndexData(index)
          count === index + 1
            ? setactiveStatus('disabled')
            : setactiveStatus('')
        }

        return null
      })
  }
  // when click on previous button
  function clickprevious() {
    bodyObject &&
      bodyObject.map((checkEvidence, index) => {
        if (index === indexData - 1) {
          setevidenceID(checkEvidence.evidence_id)
          setevidenceName(checkEvidence.evidence_name)
          setIndexData(index)
          index === 0
            ? setbackactiveStatus('disabled')
            : setbackactiveStatus('')
        }
        return null
      })
  }

  function commentOption(event) {
    const value = event.target.value
    setDdlValue(event.target.value)
    value === '0' ? setIsSkillVisible(false) : setIsSkillVisible(true)
  }

  // when click on send button of add comment section
  function AddEvidenceComment(e) {
    // e.stopPropagation()

    const finaldata = {
      comment: {
        content: content,
        type: ddlvalue,
        response: '',
        evidence_ids: [evidenceID],
        school_class_id: classid,
      },
    }
    dispatch.classesPage.addCommentbyEvidenceID({
      params: finaldata,
    })
    setContent('')
    setDdlValue('0')
    setIsOpenComment((prev) => !prev)

    // const userdataval = dispatch.classesPage.getEvidenceDiscussionEvent({
    //   params: {
    //     evidenceid: evidenceId,
    //   },
    // })
  }
  const evidenceFeedback1 = useSelector(
    (state) => state.classesPage.evidencediscussiondata
  )
  useEffect(() => {
    setevidenceData(evidenceFeedback1)
  })

  function changeEvidenceStatus(e) {
    e.stopPropagation()

    const eviStatus = e.currentTarget.dataset.id
    setevidenceStatus(eviStatus)
    const finaldata = {
      evidence_status: {
        status: eviStatus,
        evidence_ids: [evidenceID],
      },
    }
    dispatch.classesPage.changeEvidenceStatus({
      params: finaldata,
    })
  }
  // File upload and Update link
  const [selectedFile, setSelectedFile] = useState()
  // const [isSelected, setIsSelected] = useState(false)
  const [linkURL, setlinkURL] = useState()
  const changeFileHandler = (event) => {
    setSelectedFile(event.target.files[0])
    // setIsSelected(true)
  }

  const handleAttachSubmission = () => {
    const formData = new FormData()
    formData.append('evidence[url]', linkURL)
    formData.append('evidence[attachment]', selectedFile)

    dispatch.classesPage.attachartifacttoevidence({
      evidenceid: evidenceID,

      formvalue: formData,
    })
  }

  return (
    <>

      {/* <div className="modal"> */}
      {/* <div className="overlay"></div> */}
    <div className="overlay_style"></div>
      <Modal
        show={open ? true : false}
        dialogClassName="feedback-modal modal-xl"
      >
        
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Feedback</h4>
              <button type="button" className="close" onClick={onClose}>
                &times;
              </button>
            </div>

            <div className="modal-body feedback-body">
              <div className="row">
                <div className="col-lg-8">
                  <h3 className="heading">{projectName}</h3>
                </div>
              </div>
              <div className="head-wrap">
                <ul className="nextPre">
                  <Tooltip
                    title={
                      <Typography fontSize={50}>{prevEvidence}</Typography>
                    }
                  >
                    <li onClick={clickprevious} className={backactiveStatus}>
                      <span>
                        <i className="far fa-chevron-left"></i>
                      </span>
                      Prev
                    </li>
                  </Tooltip>

                  <Tooltip
                    title={
                      <Typography fontSize={50}>{nextEvidence}</Typography>
                    }
                  >
                    <li onClick={clickNext} className={activeStatus}>
                      Next
                      <span>
                        <i className="far fa-chevron-right"></i>
                      </span>
                    </li>
                  </Tooltip>
                </ul>
                <div
                  className="preview-link"
                  id="artifactPreview"
                  onClick={artifactevents}
                >
                  <span>
                    <i className="far fa-image"></i>
                  </span>
                  Artifact Preview
                </div>
              </div>
              <div style={style}>
                <div
                  className="artifact-preview-wrap"
                  style={{ display: isVisible === true ? 'block' : 'none' }}
                >
                  <span
                    id="closePreview"
                    onClick={() => setIsVisible((prev) => !prev)}
                  >
                    &times;
                  </span>

                  <img src="{artifactImagePath}" className="img-fluid" alt="" />
                </div>
                <div
                  className="artifact-preview-wrap iframe-bg"
                  style={{ display: isdocsVisible === true ? 'block' : 'none' }}
                >
                  <span
                    id="closePreview"
                    onClick={() => setIsDocsVisible((prev) => !prev)}
                  >
                    &times;
                  </span>

                  <iframe src={serviceURL} height="880" width="940"></iframe>
                  {/* Detect screen size and fit the frame */}
                </div>
              </div>
              <div className="feedback-wrapper">
                <div className="row">
                  <div className="col-lg-8">
                    <h3 className="heading">{evidenceName}</h3>
                    <div className="comments-group">
                      {evidenceData && evidenceData.length > 0
                        ? evidenceData.map((evicontent, i) => {
                          if (evicontent.is_editable === false) {
                            return (
                              <div key={i} className="comment-item">
                                <div className="comment-box">
                                  <p>
                                    {evicontent.event_type === 'comment'
                                      ? evicontent.content.content
                                      : evicontent.content}
                                  </p>
                                  <div className="bottom-head">
                                    <ul>
                                      <li>{evicontent.author_name}</li>
                                      <li>
                                        <span>
                                          <i className="far fa-calendar-alt"></i>
                                        </span>
                                        {evicontent.created_at}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="by-text">Gernal</div>
                              </div>
                            )
                          } else {
                            return (
                              <div className="comment-item right-comment-item">
                                <div className="comment-box">
                                  <p>
                                    {evicontent.event_type === 'comment'
                                      ? evicontent.content.content
                                      : evicontent.content}
                                  </p>
                                  <div className="bottom-head">
                                    <ul>
                                      <li>{evicontent.author_name}</li>
                                      <li>
                                        <span>
                                          <i className="far fa-calendar-alt"></i>
                                        </span>
                                        {evicontent.created_at}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="by-text">
                                  {evicontent.event_type}
                                </div>
                              </div>
                            )
                          }
                        })
                        : null}
                    </div>

                    <div className="button-group">
                      <button
                        disabled={!dataAttributes.add_comment_enabled}
                        type="button"
                        className="btn btn-button"
                        id="addComment"
                        onClick={() => setIsOpenComment((prev) => !prev)}
                      >
                        Add Comment
                      </button>
                    </div>

                    <div
                      id="commentBox"
                      className="comment-wrapper1"
                      style={{
                        display: isOpenComment === true ? 'block' : 'none',
                      }}
                    >
                      <h3 className="heading">Comments</h3>
                      <div className="comment-type-box filter-wrap">
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="form-group">
                              <select
                                className="form-control feedback-modal-selectbox"
                                id="ddlcomment"
                                onChange={commentOption}
                              >
                                {dataAttributes.add_comment_options &&
                                  dataAttributes.add_comment_options.map(
                                    (commentoptions) =>
                                      commentoptions &&
                                      commentoptions.map((component, i) => (
                                        <option key={i} value={component[0]}>
                                          {component[1]}
                                        </option>
                                      ))
                                  )}
                              </select>
                              <button
                                style={{
                                  display:
                                    isskillVisible === true ? 'block' : 'none',
                                }}
                                type="button"
                                className="btn btn-custom"
                                onClick={showSkill}
                              >
                                Skill Levels
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                placeholder="Write a comments"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group buttonBox d-flex justify-content-start">
                              <button
                                type="button"
                                className="btn btn-custom"
                                onClick={AddEvidenceComment}
                              >
                                <i className="fas fa-paper-plane"></i>Send
                              </button>
                              <button
                                type="button"
                                className="btn btn-custom"
                                id="btnCancel"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="feedback-right">
                      <div className="feedback-notes">
                        <p>
                          {dataAttributes.status === 'in_progress'
                            ? 'Please add evidence (file or URL) and click Send to request revision.'
                            : dataAttributes.status === 'assigned'
                              ? 'Please add evidence (file or URL) and click Send to request revision.'
                              : ''}
                        </p>
                      </div>

                      <div className="feedback-pictures">
                        <div
                          className="doc-box"
                          style={{
                            display:
                              isActionButtonVisible === true ? 'block' : 'none',
                          }}
                        >
                          <span className="image-icon">
                            <i className="fas fa-file-image"></i>
                          </span>
                          <span className="uploded-text">
                            <i>{serviceURL}</i>
                          </span>
                        </div>
                        {/* Update start */}

                        <div className="evidence-container">
                          <div
                            className="evidence-section update upload-evidence"
                            style={{
                              display:
                                isDocsUpdateVisible === true ? 'block' : 'none',
                            }}
                          >
                            <div className="attach-evidence-form">
                              <div className="artifact-inputs">
                                <h4>Attach evidence from:</h4>
                                <div className="from-computer">
                                  <div>
                                    <i className="material-icons insert_drive_file ">
                                      insert_drive_file
                                    </i>
                                    <span className="label">Computer file</span>
                                  </div>

                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                  />
                                </div>
                                <div className="from-link">
                                  <div>
                                    <i className="material-icons link ">link</i>
                                    <span className="label">Add a link</span>
                                  </div>
                                  <input
                                    className="url-input"
                                    placeholder="Paste any URL here"
                                    type="text"
                                    onChange={(e) => setlinkURL(e.target.value)}
                                    value={linkURL}
                                  ></input>
                                </div>
                              </div>
                              <div className="actionButtons">
                                <button
                                  name="button"
                                  className="btn-delete"
                                  onClick={updateClickButton}
                                >
                                  Cancel
                                </button>

                                <button
                                  name="button"
                                  type="submit"
                                  className="btn-update"
                                  onClick={handleAttachSubmission}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            className="actionButtons"
                            style={{
                              display:
                                isActionButtonVisible === true
                                  ? 'block'
                                  : 'none',
                            }}
                          >
                            <button type="button" className="btn-delete">
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={updateClickButton}
                              className="btn-update"
                            >
                              Update
                            </button>
                            {/* {
                                if(serviceURL.length >0)
                                {

                                }
                              } */}
                            <button
                              type="button"
                              className="btn-view"
                              target="_blank"
                              onClick={callArtifactDocs}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="feedback-status">
                        <h4>Status:</h4>
                        <ul>
                          {evidenceStatus === 'completed' ? (
                            <>
                              <li
                                data-id="in_progress"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons">tonality</span>
                                Mark as In progress
                              </li>
                              <li
                                className="active"
                                data-id="completed"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons active">
                                  check_circle
                                </span>
                                Mark as Complete
                              </li>
                              <li
                                name="notstarted"
                                data-id="notstarted"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons">
                                  radio_button_unchecked
                                </span>
                                Not Started
                              </li>
                            </>
                          ) : evidenceStatus === 'in_progress' ? (
                            <>
                              <li
                                data-id="in_progress"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons">tonality</span>
                                Mark as In progress
                              </li>
                              <li
                                className="active"
                                data-id="completed"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons active">
                                  check_circle
                                </span>
                                Mark as Complete
                              </li>
                              <li
                                name="notstarted"
                                data-id="notstarted"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons">
                                  radio_button_unchecked
                                </span>
                                Not Started
                              </li>
                            </>
                          ) : (
                            <>
                              <li
                                data-id="in_progress"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons">tonality</span>
                                Mark as In progress
                              </li>
                              <li
                                data-id="completed"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons active">
                                  check_circle
                                </span>
                                Mark as Complete
                              </li>
                              <li
                                data-id="notstarted"
                                className="active"
                                onClick={changeEvidenceStatus}
                              >
                                <span className="material-icons">
                                  radio_button_unchecked
                                </span>
                                Not Started
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="more-buttons">
                      <button className="btn btn-revision">
                        {metaLabelAttributes.progress_status_revision}
                        <span>
                          <i className="fas fa-paper-plane rt50"></i>
                        </span>
                      </button>
                      <button className="btn btn-goto">
                        {metaLabelAttributes.go_to_project}
                        <span>
                          <i className="fas fa-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="portfollos-box">
                      <div className="portfollos-head">
                        <h3 className="heading">
                          {dataAttributes.add_to_portfolio_title}
                        </h3>
                        <button type="button" className="btn btn-button">
                          Add to Portfollos
                        </button>
                      </div>
                      <div
                        className="portfollos-note"
                        dangerouslySetInnerHTML={{
                          __html: dataAttributes.add_to_portfolio_instructions,
                        }}
                      ></div>
                      <div className="portfollos-list">
                        <div className="portfollos-search filter-wrap">
                          <div className="row d-flex justify-content-end">
                            <div className="col-lg-3">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="fal fa-search"></i>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search for a skill"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table custom-table">
                            <thead>
                              <tr>
                                <th style={{ width: '50px' }}>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="myCheck22"
                                      name="example1"
                                      value="1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="myCheck22"
                                    ></label>
                                  </div>
                                </th>
                                <th>In Portfolio</th>
                                <th>Skill</th>
                                <th>Rate Evidence</th>
                                <th>Weight</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="myCheck21"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="myCheck21"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <span className="portfolioChecked">
                                    <i className="far fa-check-circle"></i>
                                  </span>
                                </td>
                                <td>SM2, Stress Management</td>
                                <td>In progress</td>
                                <td>x1</td>
                                <td>
                                  <a href="#">
                                    <i className="fas fa-pen"></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="myCheck31"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="myCheck31"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <span className="portfolioChecked">
                                    <i className="far fa-check-circle"></i>
                                  </span>
                                </td>
                                <td>Communication in Diverse Enviroments</td>
                                <td>Meet Competency</td>
                                <td>x1</td>
                                <td>
                                  <a>
                                    <i className="fas fa-pen"></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="myCheck41"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="myCheck41"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <span className="portfolioChecked">
                                    <i className="far fa-check-circle"></i>
                                  </span>
                                </td>
                                <td>Communication</td>
                                <td>Exceeds Competency</td>
                                <td>x1</td>
                                <td>
                                  <a>
                                    <i className="fas fa-pen"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Modal>
      <ModalShowSkills
        open={isOpenSkills}
        onClose1={() => setIsOpenSkills(false)}
        evidenceId={evidenceID}
        scores={evidenceScore}
      ></ModalShowSkills>
    </>
  )
}
