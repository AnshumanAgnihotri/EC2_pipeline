import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import $, { isEmptyObject, } from 'jquery'
import SkeletonLoader from '../shared/skeletonLoader'
import { useRouter } from 'next/router'
import { evidenceListStatus } from '../../utils/utils.js'

// import Modal from '../modal/modal.js'
import Modalcomments from '../modal/modalcomments.js'
import ModalFeedback from '../modal/modalfeedback.js'
import { allEvidenceStatus, PROGRESS_STATUS } from '../../utils/utils.js'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import ModalConfrm from '../modal/modalconfirm.js'
import { isEmptyArray } from '../../utils/utils.js'
import HeadMetadata from '../shared/HeadMetadata/index.js'
const ArtificatPreviewSection = dynamic(
  () => import('../classes/classPanel/ArtifactPreview'),
  { ssr: false }
)

import EvidenceSkills from './evidenceSkills'
// import CommentSection from './commentSection'
import moment from 'moment'

function EvidenceAll() {
  const dispatch = useDispatch()
  const teacher = useSelector((state) => state.user)
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const selectedClass = useSelector(
    (state) => state.schoolClasses.selectedClass
  )

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)
  const [isOpenConfirm, setIsOpenConfrim] = useState(false)
  const [isOpenFeedback, setIsOpenFeedback] = useState(false)

  const [eviscope, setEviScope] = useState([])
  const [evidenceId, setEvidenceId] = useState([])
  const [evidenceStatus, setEvidenceStatus] = useState('')

  const [searchLearners, setsearchLearners] = useState('')
  const [searchEvidence, setsearchEvidence] = useState('')
  const [searchProjects, setsearchProjects] = useState('')
  const [classID, setClassID] = useState()
  const [pageCount, setPageCount] = useState(10)
  const [page, setPage] = useState(1)
  const [resetState, setResetState] = useState(false)
  const [status, setStatus] = useState([])
  const [count, setCount] = useState(0)
  const [classId, setClassId] = useState('')
  const isLoading = useSelector((state) => state.loading.global)
  const studentEvidencSkill = useSelector(
    (state) => state.classesPage.studentEvidencSkill
  )

  const evidenceSkillScore = useSelector(
    (state) => state.classesPage.evidenceSkiillScore
  )


  
  const successMessage = useSelector(
    (state) => state.classesPage.successMessage
  )

  const handleSuccessMessageClose = () => {
    dispatch.classesPage.setSuccessMessage(null)
  }

  useEffect(() => {
    if (selectedTerm && selectedClass) {
      setClassID(selectedClass.id)
      loadEvidences()
    }
    return () => {
      onClose();
    }
  }, [selectedClass, pageCount, page])

  // End
  useEffect(() => {
    if (selectedTerm && selectedClass) {
      // dispatch.classesPage.getProjects({
      //   selectedTermId: selectedTerm.id,
      //   classId: selectedClass.id,
      // })
    }
  }, [selectedClass])

  const projects = useSelector((state) => state.classesPage.projects)
  const learners = useSelector((state) => state.classesPage.learners)
  const evidences = useSelector((state) => state.classesPage.evidences)

  const classes = useSelector((state) => state.schoolClasses.schoolClasses)
  const evidencesdetails = useSelector(
    (state) => state.classesPage.evidencesdetails
  )

  const evidencePaginationInfo = useSelector(
    (state) => state.classesPage.evidencePaginationInfo
  )
  const [checkEvidences, setCheckState] = useState([])

  useEffect(() => {
    if (selectedTerm && selectedClass) {
      setCheckState(evidencesdetails)
    }
  }, [evidencesdetails])
  function handleChangePageCount(event) {
    setPageCount(event.target.value)
  }
  const [show, setShow] = useState(false)
  const handleChange = (e) => {
    const { name, checked } = e.target
    if (name === 'selectall') {
      const tempevidence = checkEvidences.map((user) => {
        return { ...user, isChecked: checked }
      })
      setCheckState(tempevidence)
      const reducer = (shouldShow, evidence) => {
        return shouldShow || evidence.isChecked
      }
      setShow(tempevidence.reduce(reducer, false))
      const evidenceIds = tempevidence
        .filter((evidence) => evidence.isChecked)
        .map(({ evidence_id }) => evidence_id)
      setCount(evidenceIds.length)
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
      const evidenceIds = tempevidence
        .filter((evidence) => evidence.isChecked)
        .map(({ evidence_id }) => evidence_id)
      setCount(evidenceIds.length)
    }
  }
  function updatebuttonstatus(e) {
    e.preventDefault()
    $(e.currentTarget).parent('.status-box').find('.update-status').toggle()
  }

  const updateliEvents = (e) => {
    $('.update-status').hide()
    setIsOpenConfrim((prev) => !prev)
    setEvidenceStatus(e.target.dataset.status)
  }

  const getLearnersByProject = (projectId) => {
    dispatch.classesPage.getLearnersByProject({
      classId: selectedClass.id,
      projectId: projectId,
    })
  }

  const getEvidencesByLearner = (projectId, learnerId) => {
    dispatch.classesPage.getEvidencesByProjectLearner({
      projectId: projectId,
      learnerId: learnerId,
    })
  }

  function spanEvent(e) {
    e.preventDefault()

    $(e.currentTarget).parent('.table-status').find('.update-status').toggle()
    $('#overlab').addClass('overlab')
    $(e.currentTarget).parents('tr').addClass('active')
  }
  function liEvents(e, eID) {
    const text = $(e.currentTarget).html()
    $(e.currentTarget)
      .parents('div.custom-select-list')
      .siblings('div.custom-select-div')
      .html(text)
    $('.update-status').hide()
    $('#overlab').removeClass('overlab')
    $(e.currentTarget).parents('tr').removeClass('active')
    const params = {
      evidenceId: eID,
      params: {
        evidence_status: {
          status: e.target.dataset.status,
        },
      },
    }
    setEvidenceStatus(e.target.dataset.status)
    updateEvidencStatus(e.target.dataset.status, params)
  }
  const router = useRouter()
  const loadEvidences = () => {
    const routerTermID = router.query.termID
    setResetState(false)
    
    let reqParams = {
      selectedTermId: routerTermID,
      params: {
        student_name: searchLearners, // 'Holt'
        evidence_name: searchEvidence,
        project_name: searchProjects,
        statuses: status,
        page: page,
        per_page: pageCount,
      },
    }
    if (classId) {
      reqParams.params.school_class_ids = [classId]
    }

    dispatch.classesPage.getEvidencebyTermID(reqParams)
  }

  function searchEvidenceData() {
    setPage(1);
    loadEvidences()
  }
  const setPageHandler = (page) => {
    if (page === null) return null
    setPage(page)
  }

  const clearEvidenceData = async () => {
    setShow(false)
    setsearchLearners('')
    setsearchEvidence('')
    setsearchProjects('')
    setStatus('')
    setClassId('')
    setResetState(true)
  }

  useEffect(() => {
    if (resetState) {
      setsearchLearners('')
      setsearchEvidence('')
      setsearchProjects('')
      setStatus('')
      setClassId('')
      loadEvidences()
    }
  }, [resetState])

  const clearSelectionHandler = () => {
    setShow(false)
    loadEvidences()
  }

  const statusHandler = (e) => {
    setStatus([e.target.value])
  }

  const updateEvidencStatus = (evStatus, params) => {
    const checkEvidenceStatus = PROGRESS_STATUS.find(
      (p_staus) => p_staus.status === evStatus
    )
    if (checkEvidenceStatus?.status === evStatus) {
      dispatch.classesPage
        .changeEvidenceProgressStatus(params)
        .then((response) => {
          setIsOpenConfrim(false)
        })
        .catch((error) => {
          console.log('error', error)
          setIsOpenConfrim(false)
          setShow(false)
        })
    } else {
      let reqParams = params
      if (params?.evidenceId) {
        reqParams = {
          evidence_status: {
            status: evStatus,
            evidence_ids: [params?.evidenceId],
          },
        }
      }
      dispatch.classesPage
        .changeEvidenceStatus(reqParams)
        .then((response) => {
          setIsOpenConfrim(false)
          setShow(false)
        })
        .catch((error) => {
          console.log('error', error)
          setIsOpenConfrim(false)
        })
    }
  }
  const submitBulkHandler = () => {
    const evidenceIds = checkEvidences
      .filter((evidence) => evidence.isChecked)
      .map(({ evidence_id }) => evidence_id)
    const params = {
      evidence_status: {
        status: evidenceStatus,
        evidence_ids: evidenceIds,
      },
    }
    updateEvidencStatus(evidenceStatus, params)
  }

  const container = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      onClickOutside()
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const onClickOutside = (event) => {
    $('.table-status').find('.update-status').hide()
    $('#otherOption').find('.update-status').hide()
  }

  const { getEvidencebyTermID } = useSelector(
    (state) => state.loading.effects.classesPage
  )
  const states = useSelector((state) => state.loading.effects)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const [evidenceData, setEvidenceData] = useState({})
  const [isArtifactPreview, setIsArtifactPreview] = useState(false)
  const [isArtifactFullView, setIsArtifactFullView] = useState(false)
  const [name, setName] = useState('')
  const [evidenceID, setEvidenceID] = useState('')
  const [artifactPreviewData, setArtifactPreviewData] = useState(false)

  const handleArtifactClick = (evidenceID, artifact, name) => {
    console.log('artifact',artifact)
    scrollToTop()
    setName(name)
    setArtifactPreviewData(artifact)
    setEvidenceID(evidenceID)
    setIsArtifactPreview(true)
  }

  const handleArtifactClose = () => {
    setIsArtifactPreview((prev) => !prev)
    setIsArtifactFullView(false)
    setIsOpen(false)
  }

  const artifactUpdateHandler = (artifact) => {
    console.log('artifact handler',artifact);
    const tempevidence = checkEvidences.map((evidence) => {
      if (evidence.evidence_id == artifact.evidenceId) {
          const clonevidence = {...evidence}
          if (artifact?.action == 'add_update') {
            clonevidence.artifact = artifact?.artifact;
            if (clonevidence.evidence_status == evidenceListStatus.assigned) {
                clonevidence.evidence_status = evidenceListStatus.in_progress;
            }
        } else {
            clonevidence.artifact = {};
            clonevidence.evidence_status = evidenceListStatus.assigned;
        }
        return clonevidence
      }
      return evidence
    })
    setCheckState(tempevidence)
  }


  const onClose = () => {
    dispatch.classesPage.evidenceSkillScoreAction({
      isOpen: false,
      evidence: {},
    });
    dispatch.classesPage.evidenceCommentAction({isOpen:false,evidence:{}})
    setIsOpen(false)
    setIsArtifactFullView(false)
    setIsArtifactPreview(false)

  }

 const updateStudentEvidence = (obj) => {
    if (!isEmptyObject(obj)) {
      const tempevidence = checkEvidences.map((evidence) => {
        if (
          evidence.evidence_id === obj?.evidenceId &&
          evidence.student_id === obj?.studentId
        ) {
          const evi = { ...evidence }
          const evidenceSkillScore = evidence.evidence_scores.map((skill) => {
            if (
              skill.external_skill_id ==
              obj?.skills?.skill_id
            ) {
              console.log('score skills',obj)
              const skillRatings = { ...skill }
              skillRatings.score = obj?.skills?.score
              skillRatings.level_id = obj?.skills?.level_id
              return skillRatings
            }
            return skill
          })
          evi.evidence_scores = evidenceSkillScore
          const params = {
            isOpen: true,
            evidence: evi,
          }
          dispatch.classesPage.evidenceSkillScoreAction(params);
          return evi
        }

        return evidence
      })
      setCheckState(tempevidence)
    }
  }

  const updateEvidencePortfollio = (obj) => {
    const tempevidence = checkEvidences.map((evidence) => {
      if (
        evidence.evidence_id === obj?.evidenceId &&
        evidence.student_id === obj?.studentId
      ) {
        const evi = { ...evidence };
        let portfolioData = [];
        if (!isEmptyArray(evidence.portfolios)) {
          if (obj.action == 'remove') {
            const portfolioData = evidence.portfolios.map((item) => {
                if (item.id === obj.portfolio_id) {
                  return {...item,is_approved:false}
                } else {
                  return item;
                }
            })
            evi.portfolios = portfolioData;
            
          } else {
            const portfolioId = evidence.portfolios.find((portfollio) => portfollio.id === obj.portfollio[0].portfolio_id)
            if (portfolioId) {
                const portfolioData = evidence.portfolios.map((item) => {
                  if (item.id === obj.portfolio_id) {
                    return {...item,is_approved:true}
                  } else {
                    return item;
                  }
              })
              evi.portfolios = portfolioData;
            } else {
              const prePortfollios = [...evidence.portfolios];
              const newPortfollio = {};
              newPortfollio.external_skill_id = obj.portfollio[0].skill_id,
              newPortfollio.id = obj.portfollio[0].portfolio_id,
              newPortfollio.is_approved = true;
              evi.portfolios = [...prePortfollios,...newPortfollio];
            }
          }
           
        } else {
          const newPortfollio = {};
          newPortfollio.external_skill_id = obj.portfollio[0].skill_id,
          newPortfollio.id = obj.portfollio[0].portfolio_id,
          newPortfollio.is_approved = true
          portfolioData.push(newPortfollio); 
          evi.portfolios = portfolioData;
        }
       
        const params = {
          isOpen: true,
          evidence: evi,
        }
        dispatch.classesPage.evidenceSkillScoreAction(params);
        return evi
      }

      return evidence
    })
    setCheckState(tempevidence)
  }


  const evidenceCommentAction = useSelector((state) => state.classesPage.evidencecomments);
  
  const evidenceScoreHandler = (skillScore) => {
    console.log('')
  }

  if (getEvidencebyTermID) {
    return <SkeletonLoader height={100} width={1500} margin={'10px'} />
  }
  return (
    <>
      <HeadMetadata metadata={{ title: 'Evidences' }} />
      <div className="top-wrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-wrap">
                <h2>
                  <span className="material-icons">assignment</span>Evidence -
                  All
                </h2>
                {/* <div className="checkBox">
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
                </div> */}
              </div>
              <div className="filter-wrap">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Evidence"
                          value={searchEvidence}
                          onChange={(e) => setsearchEvidence(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Project"
                          value={searchProjects}
                          onChange={(e) => setsearchProjects(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <div className="class-selectbox">
                        <select
                          className="form-control"
                          multiple={false}
                          value={classId}
                          onChange={(e) => setClassId(e.target.value)}
                        >
                          <option value="">Select Class</option>
                          {!isEmptyArray(classes) &&
                            classes.map((classItem, key) => (
                              <option key={key} value={classItem.id}>
                                {classItem.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <div className="form-group">
                        <div className="class-selectbox">
                          <select
                            className="form-control"
                            multiple={false}
                            value={status}
                            name="statuses"
                            onChange={(e) => statusHandler(e)}
                          >
                            <option value="">Select status</option>
                            <option value="locked">Locked</option>
                            <option value="assigned">Assigned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="in_portfolio">In Portfolio</option>
                            {/* <option value="unlock_requested">
                              Unlock Requested
                            </option> */}
                            <option value="review">Review Requested</option>
                            <option value="revise">Revision Requested</option>
                            <option value="overdue">Overdue</option>
                            {/* <option value="unread">Unread</option> */}
                          </select>
                        </div>
                      </div>
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
                      <button
                        type="button"
                        onClick={clearEvidenceData}
                        className="btn btn-custom"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div
              id="evidenceActionBox"
              className="col-lg-4 left-side-wrap"
              style={{ display: 'block' }}
            >
              {/* <!-- skills start --> */}
              {evidenceSkillScore?.isOpen && (
                <EvidenceSkills
                  isOpen={evidenceSkillScore?.isOpen}
                  onClose={onClose}
                  updateStudentEvidence={updateStudentEvidence}
                  updateEvidencePortfollio={updateEvidencePortfollio}
                />
              )}
              {/* <!-- skills End --> */}

              {/* <!-- Artifact start --> */}
              <ArtificatPreviewSection
                name={name}
                evidenceID={evidenceID}
                open={isArtifactPreview}
                artifact={artifactPreviewData}
                onClose={() => handleArtifactClose()}
                setIsArtifactFullView={setIsArtifactFullView}
                isArtifactFullView={isArtifactFullView}
                artifactUpdateHandler={artifactUpdateHandler}
              />

              {/* <!-- Artifact End --> */}

              {/* <!-- Comments start --> */}
              {/* {evidenceCommentAction?.isOpen  && 
              <CommentSection onClose={onClose} />}
             */}
              {/* <!-- Comments End --> */}
            </div>
            <div
              id="evidenceFullWidth"
              className={`p-0  ${
                isArtifactPreview || isOpen ? 'col-lg-8 ' : 'col-lg-12'
              }`}
            >
              <div className="table-responsive scrollBarList">
                <table
                  className="table table-striped custom-table1"
                  id="overlab"
                >
                  <thead>
                    <tr>
                      {/* <th>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="selectall"
                            className="custom-control-input"
                            id="customCheck"
                            checked={
                              checkEvidences &&
                              checkEvidences.filter(
                                (user) => user?.isChecked !== true
                              ).length < 1
                            }
                            onChange={handleChange}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          ></label>
                        </div>
                      </th> */}
                      <th style={{ width: '230px' }}>Evidence</th>
                      <th style={{ width: '220px' }}>Status</th>
                      <th>Scores</th>
                      <th>Comments</th>
                      <th>Due</th>
                      <th>Project</th>
                      <th>Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkEvidences && checkEvidences.length > 0 ? (
                      checkEvidences.map((checkEvidence, index) => {
                        return (
                          <tr key={index}>
                            {/* <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`myCheck-${index}`}
                                  name={checkEvidence.evidence_id}
                                  checked={checkEvidence?.isChecked || false}
                                  onChange={handleChange}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`myCheck-${index}`}
                                ></label>
                              </div>
                            </td> */}
                           
                            <td>
                             
                                <div
                                  className="text-limit cursor-pointer"
                                  title={checkEvidence.evidence_name}
                                  onClick={() => {
                                    setIsOpen((prev) => !prev)
                                    handleArtifactClick(
                                      checkEvidence.id,
                                      checkEvidence.artifact,
                                      checkEvidence.evidence_name
                                    )
                                  }}
                                >
                                  {checkEvidence.evidence_name}
                                </div>
                            </td>
                            <td>
                              <div className="table-status">
                                {(() => {
                                  let status = checkEvidence.e_progress_status
                                    ? checkEvidence.e_progress_status
                                    : checkEvidence.evidence_status
                                  if (status === '') {
                                    return (
                                      <div
                                        key="s13"
                                        className="custom-select-div spanDropdown"
                                      >
                                        <span className="material-icons">
                                          radio_button_unchecked
                                        </span>
                                        Not Started
                                      </div>
                                    )
                                  } else if (status === 'assigned') {
                                    return (
                                      <div
                                        key="s13"
                                        className="custom-select-div spanDropdown"
                                       
                                      >
                                        <span className="material-icons assigned">
                                          radio_button_unchecked
                                        </span>
                                        Assigned
                                      </div>
                                    )
                                  } else if (status === 'in_progress') {
                                    return (
                                      <div
                                        key="s13"
                                        className="custom-select-div spanDropdown"
                                        
                                      >
                                        <span className="material-icons in_progress">
                                          tonality
                                        </span>
                                        In Progress
                                      </div>
                                    )
                                  } else if (status === 'completed') {
                                    return (
                                      <div
                                        key="s13"
                                        className="custom-select-div spanDropdown"
                                       
                                      >
                                        <span className="material-icons completed">
                                          check_circle
                                        </span>
                                        Complete
                                      </div>
                                    )
                                  } else if (status === 'in_portfolio') {
                                    return (
                                      <div
                                        key="s13"
                                        className="custom-select-div spanDropdown"
                                        
                                      >
                                        <span className="material-icons in_portfolio">
                                          folder
                                        </span>
                                        In Portfolio
                                      </div>
                                    )
                                  } else if (status === 'locked') {
                                    return (
                                      <div
                                        key="s14"
                                        className="custom-select-div spanDropdown"
                                        
                                      >
                                        <span className="material-icons locked">
                                          lock
                                        </span>
                                        Locked
                                      </div>
                                    )
                                  } else if (status === 'unlock_requested') {
                                    return (
                                      <div
                                        key="s15"
                                        className="custom-select-div spanDropdown"
                                        
                                      >
                                        <span className="material-icons unlock_requested">
                                          vpn_key
                                        </span>
                                        Unlock Requested{' '}
                                      </div>
                                    )
                                  } else if (status === 'review') {
                                    return (
                                      <div
                                        key="s15"
                                        className="custom-select-div spanDropdown"
                                        
                                      >
                                        <span className="material-icons review">
                                          find_in_page
                                        </span>
                                        Review Requested{' '}
                                      </div>
                                    )
                                  } else if (status === 'revise') {
                                    return (
                                      <div
                                        key="s15"
                                        className="custom-select-div spanDropdown"
                                        
                                      >
                                        <span className="material-icons revise">
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
                                    {allEvidenceStatus
                                      .filter((item) => item.enable === true)
                                      .map((liItem, index) => (
                                        <>
                                          <li
                                            key={`s1-${index}`}
                                            data-status={liItem.status}
                                            onClick={(e) => {
                                              liEvents(
                                                e,
                                                checkEvidence.evidence_id
                                              )
                                            }}
                                          >
                                            <span
                                              className={`material-icons ${liItem.status}`}
                                            >
                                              {liItem.class_icon}
                                            </span>
                                            {liItem.value}
                                          </li>
                                        </>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              {checkEvidence.evidence_scores &&
                                checkEvidence.evidence_scores
                                  .slice(0, 1)
                                  .map((scores, i) => (
                                      <span key={i}>
                                        <div className="text-limit"  title={scores.name}>
                                          {scores.name}
                                        </div>

                                        <span
                                       
                                          className="spanLink scoreLink"
                                          onClick={() => {
                                            setIsArtifactFullView(false)
                                            setIsArtifactPreview(false)
                                            setIsOpen(true)
                                            setEvidenceData(checkEvidence)
                                            const params = {
                                              isOpen: true,
                                              evidence: checkEvidence,
                                            }
                                            dispatch.classesPage.evidenceSkillScoreAction(
                                              params
                                            )
                                            setEvidenceId(
                                              checkEvidence.evidence_id
                                            )
                                          }}
                                        >
                                          {checkEvidence.evidence_scores
                                            .length > 1
                                            ? `and ${checkEvidence.evidence_scores
                                              .length-1 } more`:'See Score' 
                                            }
                                          
                                        </span>
                                      </span>
                                  ))}
                            </td>
                            <td>
                              <span className="commentId commentNumber" 
                              // onClick={() => {
                              //   setIsOpen(true)
                              //   dispatch.classesPage.evidenceCommentAction({isOpen:true,evidence:checkEvidence})
                              // }}
                              >
                                {checkEvidence?.comments.length}</span>
                            </td>
                            <td>
                              <div className="text">
                                {checkEvidence.is_overdue === true  &&<span className="overdueText">{moment(
                                    checkEvidence?.evidence_due_date
                                  ).format('MM-DD-YYYY')}</span> }
                              </div>
                            </td>
                            <td>
                                <div className="text-limit" title={checkEvidence.project_name}>
                                  {checkEvidence.project_name}
                                </div>
                            </td>
                            <td>
                                <div className="text-limit" title={checkEvidence.school_class_name}>
                                  {checkEvidence.school_class_name}
                                </div>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="2">
                          {isLoading ? (
                            <p>Please wait while we find your information</p>
                          ) : (
                            <p>No Record found</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {checkEvidences && checkEvidences.length > 0 && (
                    <tfoot>
                      <tr>
                        <td colSpan="9">
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
                            <div className="tfoot-count">
                              {evidencePaginationInfo?.pagination?.current_page}
                              -{page} of{' '}
                              {evidencePaginationInfo?.pagination?.total_count}
                            </div>
                            <div className="tfoot-button">
                              <span
                                className="preButton text-left"
                                disabled={
                                  !evidencePaginationInfo?.pagination
                                    ?.previous_page
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                  setPageHandler(
                                    evidencePaginationInfo?.pagination
                                      ?.previous_page
                                  )
                                }
                              >
                                <i className="fas fa-angle-left"></i>
                              </span>
                              <span
                                className="nextButton text-right"
                                disabled={
                                  !evidencePaginationInfo?.pagination?.nextPage
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                  setPageHandler(
                                    evidencePaginationInfo?.pagination
                                      ?.next_page
                                  )
                                }
                              >
                                <i className="fas fa-angle-right"></i>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
            <div
              id="otherOption"
              style={{ display: show ? 'block' : 'none' }}
              ref={container}
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
                  <div className="update-status" style={{ display: 'none' }}>
                    <ul>
                      <li
                        key="status1"
                        data-status={''}
                        onClick={updateliEvents}
                      >
                        <span className="material-icons">
                          radio_button_unchecked
                        </span>
                        Not Started
                      </li>
                      <li
                        key="status2"
                        data-status={'locked'}
                        onClick={updateliEvents}
                      >
                        <span className="material-icons lock">lock</span>Locked{' '}
                      </li>
                      <li
                        key="status3"
                        data-status={'in_progress'}
                        onClick={updateliEvents}
                      >
                        <span className="material-icons in_progress">
                          folder
                        </span>
                        In progress
                      </li>
                      <li
                        key="status4"
                        data-status={'complete'}
                        onClick={updateliEvents}
                      >
                        <span className="material-icons completed">
                          check_circle
                        </span>
                        Complete
                      </li>
                      <li
                        key="status5"
                        data-status={'in_portfolio'}
                        onClick={updateliEvents}
                      >
                        <span className="material-icons">tonality</span>In
                        Portfolio
                      </li>
                      {/* <li key="status6" data-status={'review'} onClick={updateliEvents}>
                        <span className="material-icons">
                          find_in_page
                        </span>
                        Review Requested
                      </li>
                      <li key="status7" data-status={'unlock_requested'} onClick={updateliEvents}>
                        <span className="material-icons">vpn_key</span>
                        Unlock Requested{' '}
                      </li>
                      <li key="status8" data-status={'revise'} onClick={updateliEvents}>
                        <span className="material-icons">create</span>
                        Revision Requested{' '}
                      </li> */}
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

                <button
                  type="button"
                  className="btn btn-button"
                  onClick={clearSelectionHandler}
                >
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
      {/* {isOpen && <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        evidenceId={evidenceId}
        bodyObject={eviscope}
      >
        Modal popup
      </Modal>} */}
      {isOpenComment && (
        <Modalcomments
          open={isOpenComment}
          onClose={() => setIsOpenComment(false)}
          itemCount={count}
          evidenceIds={checkEvidences
            .filter((evidence) => evidence.isChecked)
            .map(({ evidence_id }) => evidence_id)}
        ></Modalcomments>
      )}

      {isOpenConfirm && (
        <ModalConfrm
          open={isOpenConfirm}
          onClose={() => setIsOpenConfrim(false)}
          submitBulkHandler={submitBulkHandler}
          itemCount={count}
          status={evidenceStatus}
        ></ModalConfrm>
      )}

      {isOpenFeedback && (
        <ModalFeedback
          open={isOpenFeedback}
          onClose={() => setIsOpenFeedback(false)}
          evidenceId={evidenceId}
          bodyObject={checkEvidences}
          classid={classID}
        >
          hi satan
        </ModalFeedback>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSuccessMessageClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSuccessMessageClose}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
export default EvidenceAll
