import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import $ from 'jquery'
// Components
import PopupModal from '../../modal/modal.js'
import Modalcomments from '../../modal/modalcomments.js'
import ModalFeedback from '../../modal/modalfeedback.js'

// Material UI Components
import Modal from '../Modal'
import Box from '@material-ui/core/Box'

function OpenProjectModal({
  projectId,
  projectname,
  modalOpened,
  handleCloseModal,
}) {
  const dispatch = useDispatch()

  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const selectedClass = useSelector(
    (state) => state.schoolClasses.selectedClass
  )
  // const user = useSelector((state) => state.user)

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)
  const [isOpenFeedback, setIsOpenFeedback] = useState(false)
  const [evidenceId, setEvidenceId] = useState([])
  const [eviscope, setEviScope] = useState([])

  // Modal popup definition
  // By Satan
  const [searchLearners, setsearchLearners] = useState('')
  const [searchEvidence, setsearchEvidence] = useState('')
  const [searchProjects, setsearchProjects] = useState('')
  const [classID, setClassID] = useState()

  useEffect(() => {
    if (selectedTerm && selectedClass) {
      setClassID(selectedClass.id)
      // var classid = selectedClass.id;

      dispatch.classesPage.getEvidencebyTermID({
        selectedTermId: selectedTerm.id,
        params: {
          school_class_ids: selectedClass.id, // [16541],
          student_name: searchLearners,
          evidence_name: searchEvidence,
          project_name: projectname,
          page: 1,
          per_page: 10,
        },
      })
    }
  }, [projectId])

  const evidencesdetails = useSelector(
    (state) => state.classesPage.evidencesdetails
  )
  const [checkEvidences, setCheckState] = useState([])

  useEffect(() => {
    if (selectedTerm && selectedClass) {
      setCheckState(evidencesdetails)
    }
  }, [evidencesdetails])

  const [show, setShow] = useState(false)

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    if (name === 'selectall') {
      const tempevidence = checkEvidences.map((user) => {
        return { ...user, isChecked: checked }
      })
      console.log('tempevidence id ', tempevidence)
      setCheckState(tempevidence)
      const reducer = (shouldShow, evidence) => {
        return shouldShow || evidence.isChecked
      }
      setShow(tempevidence.reduce(reducer, false))
    } else {
      const tempevidence = checkEvidences.map((checkEvidence) =>
        checkEvidence.evidence_id.toString() === name
          ? { ...checkEvidence, isChecked: checked }
          : checkEvidence
      )

      setCheckState(tempevidence)

      const reducer = (shouldShow, evidence) => {
        return shouldShow || evidence.isChecked
      }
      setShow(tempevidence.reduce(reducer, false))
      console.log('tempevidence id ', tempevidence)
      console.log('tempevidence reducer ', reducer)
    }
  }
  const [pageCount, setPageCount] = useState([])
  function handleChangePageCount(event) {
    setPageCount([
      ...pageCount,
      { value: event.target.value, id: event.target.id },
    ])
  }

  function updatebuttonstatus(e) {
    e.preventDefault()
    $(e.currentTarget).parent('.status-box').find('.update-status').toggle()
  }
  const [openModal, setOpenModal] = useState(false)
  const updateliEvents = () => {
    $('.update-status').hide()

    setOpenModal(!openModal)
  }
  if (openModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  // const getLearnersByProject = (projectId) => {
  //   dispatch.classesPage.getLearnersByProject({
  //     classId: selectedClass.id,
  //     projectId: projectId,
  //   })
  // }

  // const getEvidencesByLearner = (projectId, learnerId) => {
  //   dispatch.classesPage.getEvidencesByProjectLearner({
  //     projectId: projectId,
  //     learnerId: learnerId,
  //   })
  // }

  // Show message when projects list is empty

  function spanEvent(e) {
    e.preventDefault()

    $(e.currentTarget).parent('.table-status').find('.update-status').toggle()
    $('#overlab').addClass('overlab')
    $(e.currentTarget).parents('tr').addClass('active')
  }
  function liEvents(e) {
    const text = $(e.currentTarget).html()
    $(e.currentTarget)
      .parents('div.custom-select-list')
      .siblings('div.custom-select-div')
      .html(text)
    $('.update-status').hide()
    $('#overlab').removeClass('overlab')
    $(e.currentTarget).parents('tr').removeClass('active')
  }

  function searchEvidenceData() {
    // var classid = selectedClass.id;

    dispatch.classesPage.getEvidencebyTermID({
      selectedTermId: selectedTerm.id,
      params: {
        school_class_ids: selectedClass.id, // [16541],
        student_name: searchLearners, // 'Holt'
        page: 1,
        per_page: pageCount.value,
      },
    })
  }
  // End

  return (
    <Modal
      open={modalOpened}
      onClose={handleCloseModal}
      aria-labelledby="Edit Project"
      aria-describedby="In this modal you can edit the project"
      disableBackdropClick
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Box mb={3}>
          <Typography variant="h4" color={'primary'}>
            {projectname}
          </Typography>

          <div>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="head-wrap">
                    <h2>
                      <span className="material-icons">assignment</span>Evidence
                      - All
                    </h2>
                    <div className="checkBox">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck11"
                          name="example1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck11"
                        >
                          Unread Comments
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck12"
                          name="example1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck12"
                        >
                          Learner Created
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="filter-wrap">
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fal fa-search"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Learner"
                              value={searchLearners}
                              onChange={(e) =>
                                setsearchLearners(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fal fa-search"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Evidence"
                              value={searchEvidence}
                              onChange={(e) =>
                                setsearchEvidence(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fal fa-search"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Project"
                              value={searchProjects}
                              onChange={(e) =>
                                setsearchProjects(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="form-group">
                          <select className="form-control">
                            <option value={0}> Status All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="form-group">
                          <select className="form-control">
                            <option value={0}> Status All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="form-group buttonBox d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-custom"
                            onClick={searchEvidenceData}
                          >
                            <i className="fas fa-search"></i>Search
                          </button>
                          <button type="button" className="btn btn-custom">
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table
                          className="table table-striped custom-table"
                          id="overlab"
                        >
                          <thead>
                            <tr>
                              <th>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    name="selectall"
                                    id="customCheck"
                                    checked={
                                      checkEvidences &&
                                      checkEvidences.filter(
                                        (user) => user?.isChecked !== true
                                      ).length < 1
                                    }
                                    onChange={handleCheckboxChange}
                                  />
                                  {/* <label className="custom-control-label" for="customCheck"></label> */}
                                </div>
                              </th>
                              <th style={{ width: '230px' }}>Learner</th>
                              <th style={{ width: '230px' }}>Evidence</th>
                              <th style={{ width: '220px' }}>Status</th>
                              <th>Scores</th>
                              <th>Due</th>
                              <th>Project</th>
                              <th>Class</th>
                            </tr>
                          </thead>
                          <tbody>
                            {checkEvidences && checkEvidences.length > 0
                              ? checkEvidences.map((checkEvidence, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            id={`myCheck-${index}`}
                                            name={checkEvidence.evidence_id}
                                            checked={
                                              checkEvidence?.isChecked || false
                                            }
                                            onChange={handleCheckboxChange}
                                          />
                                          {/* <label class="custom-control-label" for={`myCheck-${index}`}></label> */}
                                        </div>
                                      </td>
                                      <td>
                                        <Tooltip
                                          title={
                                            <Typography fontSize={50}>
                                              {checkEvidence.evidence_name}
                                            </Typography>
                                          }
                                        >
                                          <div className="text-limit">
                                            {checkEvidence.first_name}{' '}
                                            {checkEvidence.last_name}
                                          </div>
                                        </Tooltip>
                                      </td>
                                      <td>
                                        <Tooltip
                                          key="s51"
                                          title={
                                            <Typography fontSize={50}>
                                              {checkEvidence.evidence_name}
                                            </Typography>
                                          }
                                        >
                                          <div
                                            className="text-limit cursor-pointer"
                                            onClick={() => {
                                              setIsOpenFeedback(true)
                                              setEvidenceId(
                                                checkEvidence.evidence_id
                                              )
                                            }}
                                          >
                                            {checkEvidence.evidence_name}
                                          </div>
                                        </Tooltip>
                                      </td>
                                      <td>
                                        <div className="table-status">
                                          {(() => {
                                            if (
                                              checkEvidence.evidence_status ===
                                              'in_portfolio'
                                            ) {
                                              return (
                                                <div
                                                  key="s13"
                                                  className="custom-select-div spanDropdown"
                                                  onClick={spanEvent}
                                                >
                                                  <span className="material-icons">
                                                    tonality
                                                  </span>
                                                  In Portfolio
                                                </div>
                                              )
                                            } else if (
                                              checkEvidence.evidence_status ===
                                              'in_lock'
                                            ) {
                                              return (
                                                <div
                                                  key="s14"
                                                  className="custom-select-div spanDropdown"
                                                  onClick={spanEvent}
                                                >
                                                  <span className="material-icons">
                                                    lock
                                                  </span>
                                                  Locked
                                                </div>
                                              )
                                            } else {
                                              return (
                                                <div
                                                  key="s15"
                                                  className="custom-select-div spanDropdown"
                                                  onClick={spanEvent}
                                                >
                                                  <span className="material-icons">
                                                    create
                                                  </span>
                                                  Revision Requested{' '}
                                                </div>
                                              )
                                            }
                                          })()}

                                          <div
                                            className="custom-select-list update-status"
                                            style={{ display: 'none' }}
                                          >
                                            <ul>
                                              <li key="s1" onClick={liEvents}>
                                                <span className="material-icons">
                                                  radio_button_unchecked
                                                </span>
                                                Not Started
                                              </li>
                                              <li key="s2" onClick={liEvents}>
                                                <span className="material-icons">
                                                  lock
                                                </span>
                                                Locked{' '}
                                              </li>
                                              <li key="s3" onClick={liEvents}>
                                                <span className="material-icons">
                                                  folder
                                                </span>
                                                In progress
                                              </li>
                                              <li key="s4" onClick={liEvents}>
                                                <span className="material-icons">
                                                  check_circle
                                                </span>
                                                Complete
                                              </li>
                                              <li key="s5" onClick={liEvents}>
                                                <span className="material-icons">
                                                  tonality
                                                </span>
                                                In Portfolio
                                              </li>
                                              <li key="s6" onClick={liEvents}>
                                                <span className="material-icons">
                                                  find_in_page
                                                </span>
                                                Review Requested
                                              </li>
                                              <li key="s7" onClick={liEvents}>
                                                <span className="material-icons">
                                                  vpn_key
                                                </span>
                                                Unlock Requested{' '}
                                              </li>
                                              <li key="s8" onClick={liEvents}>
                                                <span className="material-icons">
                                                  create
                                                </span>
                                                Revision Requested{' '}
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        {checkEvidence.evidence_scores &&
                                          checkEvidence.evidence_scores
                                            .slice(0, 1)
                                            .map((scores, i) => (
                                              <Tooltip
                                                key={('test', i)}
                                                title={
                                                  <Typography fontSize={50}>
                                                    {scores.name}
                                                  </Typography>
                                                }
                                              >
                                                <span key={i}>
                                                  <div className="text-limit">
                                                    {scores.name}
                                                  </div>

                                                  <span
                                                    className="spanLink"
                                                    onClick={() => {
                                                      setIsOpen(true)
                                                      setEviScope(
                                                        checkEvidence.evidence_scores
                                                      )
                                                      setEvidenceId(
                                                        checkEvidence.evidence_id
                                                      )
                                                    }}
                                                  >
                                                    {' '}
                                                    and{' '}
                                                    {checkEvidence
                                                      .evidence_scores.length -
                                                      1}{' '}
                                                    more{' '}
                                                  </span>
                                                </span>
                                              </Tooltip>
                                            ))}
                                      </td>
                                      <td>
                                        <div className="text">
                                          {checkEvidence.evidence_due_date}
                                        </div>
                                      </td>
                                      <td>
                                        <Tooltip
                                          title={
                                            <Typography fontSize={50}>
                                              {checkEvidence.project_name}
                                            </Typography>
                                          }
                                        >
                                          <div className="text-limit">
                                            {checkEvidence.project_name}
                                          </div>
                                        </Tooltip>
                                      </td>
                                      <td>
                                        <Tooltip
                                          title={
                                            <Typography fontSize={50}>
                                              {checkEvidence.school_class_name}
                                            </Typography>
                                          }
                                        >
                                          <div className="text-limit">
                                            {checkEvidence.school_class_name}
                                          </div>
                                        </Tooltip>
                                      </td>
                                    </tr>
                                  )
                                })
                              : null}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="8">
                                <div className="tfoot-pagination">
                                  <div className="tfoot-pages">
                                    Rows per page:
                                    <select
                                      id="ddlpageCount"
                                      onChange={handleChangePageCount}
                                    >
                                      <option value="10">10</option>
                                      <option value="20">20</option>
                                      <option value="30">30</option>
                                      <option value="40">40</option>
                                      <option value="50">50</option>
                                    </select>
                                  </div>
                                  <div className="tfoot-count">1-10 of 50</div>
                                  <div className="tfoot-button">
                                    <span className="preButton text-left">
                                      <i className="far fa-angle-left"></i>
                                    </span>
                                    <span className="nextButton text-right">
                                      <i className="far fa-angle-right"></i>
                                    </span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div
                        id="otherOption"
                        style={{ display: show ? 'block' : 'none' }}
                      >
                        <div className="other-option d-flex justify-content-start align-items-center">
                          <div className="status-box">
                            <button
                              id="updateStatus"
                              onClick={updatebuttonstatus}
                              type="button"
                              className="btn btn-button"
                            >
                              Update Status
                              <span>
                                <i className="fas fa-chevron-down"></i>
                              </span>
                            </button>
                            <div
                              className="update-status"
                              style={{ display: 'none' }}
                            >
                              <ul>
                                <li key="status1" onClick={updateliEvents}>
                                  <span className="material-icons">
                                    radio_button_unchecked
                                  </span>
                                  Not Started
                                </li>
                                <li key="status2" onClick={updateliEvents}>
                                  <span className="material-icons">lock</span>
                                  Locked{' '}
                                </li>
                                <li key="status3" onClick={updateliEvents}>
                                  <span className="material-icons">folder</span>
                                  In progress
                                </li>
                                <li key="status4" onClick={updateliEvents}>
                                  <span className="material-icons">
                                    check_circle
                                  </span>
                                  Complete
                                </li>
                                <li key="status5" onClick={updateliEvents}>
                                  <span className="material-icons">
                                    tonality
                                  </span>
                                  In Portfolio
                                </li>
                                <li key="status6" onClick={updateliEvents}>
                                  <span className="material-icons">
                                    find_in_page
                                  </span>
                                  Review Requested
                                </li>
                                <li key="status7" onClick={updateliEvents}>
                                  <span className="material-icons">
                                    vpn_key
                                  </span>
                                  Unlock Requested{' '}
                                </li>
                                <li key="status8" onClick={updateliEvents}>
                                  <span className="material-icons">create</span>
                                  Revision Requested{' '}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-button"
                            onClick={() => {
                              setIsOpenComment(true)
                              setEvidenceId('441')
                            }}
                          >
                            Send Comment
                          </button>

                          <button type="button" className="btn btn-button">
                            Clear Selection
                          </button>
                          <button type="button" className="btn btn-button">
                            <img src="/images/undo.png" />
                          </button>
                          <button type="button" className="btn btn-button">
                            <img src="/images/repo.png" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>

      <PopupModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        evidenceId={evidenceId}
        bodyObject={eviscope}
      >
        Modal popup
      </PopupModal>
      <Modalcomments
        open={isOpenComment}
        onClose={() => setIsOpenComment(false)}
        evidenceId={evidenceId}
      >
        hi satan
      </Modalcomments>
      <ModalFeedback
        open={isOpenFeedback}
        onClose={() => setIsOpenFeedback(false)}
        evidenceId={evidenceId}
        bodyObject={checkEvidences}
        classid={classID}
      >
        hi satan
      </ModalFeedback>
    </Modal>
  )
}

export default OpenProjectModal
