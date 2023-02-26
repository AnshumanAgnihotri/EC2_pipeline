import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from "react-bootstrap/Modal";
import SelectElement from '../../../shared/SelectElement'
import PortfolioEvidences from './portfolioEvidences'
import { formatOptions, isEmptyArray, isEmptyObject } from '../../../../utils/utils'


function GradingPopper({
  id,
  open,
  anchorEl,
  handleClose,
  skillLevels,
  portfolioKey,
  selectedClassId,
  skill
}) {
  console.log('skill',skill)
  const dispatch = useDispatch()
  const emptyValue = '–'

  const selectedClass = useSelector(
    (state) => state.schoolClasses.selectedClass
  )
  // Local states
  const [levelRubric, setLevelRubric] = useState(
    skill?.latest_rating?.external_level_id || emptyValue
  );
  console.log('levelRubric',levelRubric)

  // const [levelRubric, setLevelRubric] = useState(''
  // )
  const [numericRating, setNumericRating] = useState()
  const [isApproved, setIsApproved] = useState(true)
  const [userSelection, setUserSelection] = useState(null)
  const [isAddEvidence,setIsAddEvidence] = useState(false);
  const [evidecnelist,setEvidenclist] = useState([]);

  // Redux selector
  const isReadOnly = useSelector((state) => state.schoolTerms.isReadOnly)

  const { getgetPortfolioEvidencesByTermId } = useSelector(
    (state) => state.loading.effects.classesPage
  )
  useEffect(() => {
    if (skill) {
      setEvidenclist(skill?.skill?.evidences);
    }
  },[skill])
    
  const scoreBands = useSelector(
    (state) => state.classesPage.scorePolicy?.score_bands
  )

  const [skillEvidences,setSkillEvidences] = useState([]);
  const [otherSkillEvidences,setOtherSkillEvindeces] = useState([]);

  const notInPortfollioevidences = useSelector((state) => state.classesPage.portfolioEvidencesByTermId)
  useEffect(() =>{
    setSkillEvidences(notInPortfollioevidences?.skill_evidences)
    setOtherSkillEvindeces(notInPortfollioevidences?.other_class_evidences)
  },[notInPortfollioevidences])
  useEffect(() => {
    if (userSelection === 'rubric') {
      const order = skillLevels.find((level) => level.id === levelRubric)?.order
      const scoreBand = scoreBands?.find((item) => item.level === order)
      scoreBand && setNumericRating(scoreBand.defaut_numeric_value)
    } else if (userSelection === 'numeric') {
      const level = scoreBands?.find(
        (item) =>
          numericRating >= item.min_value && numericRating <= item.max_value
      )?.level
      const skillId = skillLevels.find((item) => item.order === level)?.id

      skillId && setLevelRubric(skillId)
    }
  }, [levelRubric, numericRating])

  const handleRubricChange = (event) => {
    setUserSelection('rubric')
    setLevelRubric(event.target.value)
  }

  const handleNumericRatingChange = (event) => {
    setUserSelection('numeric')
    setNumericRating(event.target.value)
  }

  const handleStatusChange = (event) => {
    console.log(event);
    return;
    setIsApproved(event.target.checked)
    dispatch.classesPage.updatePortfolio({
      classId: selectedClassId,
      portfolioId: ratingSummary.id,
      changeStatus: true,
      portfolioKey: portfolioKey,
      params: { rating_type: isApproved ? 'unapproved' : 'approved' },
    })
    dispatch.classesPage.setPortfolioSuccessMessage(
      'You have successfully updated the status.'
    )
  }

  const handleUpdateClick = () => {
    triggerPortfolioUpdate(levelRubric, numericRating, false)
    dispatch.classesPage.setPortfolioSuccessMessage(
      'You have successfully updated the portfolio grade.'
    )
    handleClose()
  }

  console.log('skillLevels',skillLevels);
  console.log('evidences',evidecnelist);

  const handleUseSuggestedClick = () => {
    const {
      default_external_level_id: defaultExternalLevelId,
      default_numeric_score: defaultNumericScore,
    } = ratingSummary
    triggerPortfolioUpdate(defaultExternalLevelId, defaultNumericScore, true)
    dispatch.classesPage.setPortfolioSuccessMessage(
      'You have reset this portfolio grade to the calculated value.'
    )
    handleClose()
  }

  const triggerPortfolioUpdate = (externalLevelId, score, useSuggested) => {
    dispatch.classesPage.updatePortfolio({
      classId: selectedClassId,
      portfolioId: ratingSummary.id,
      changeStatus: false,
      portfolioKey: portfolioKey,
      parentData: parentData,
      skillLevels: skillLevels,
      params: {
        external_level_id:
          externalLevelId !== emptyValue ? externalLevelId : null,
        score: score,
        rating_type: 'check_in',
        author: useSuggested ? 'Lift' : 'Teacher',
      },
    })
  }

  const resetInitialValues = () => {
    // setLevelRubric(ratingSummary.external_level_id || emptyValue)
    // setNumericRating('')
    // setIsApproved(ratingSummary.approved)
    handleClose()
  }

  const getRubricName = (externalLevelId) => {
    console.log('getRubricName',externalLevelId)
    const level = skillLevels.find((level) => level.id === externalLevelId)
    // Temporary fix this should be resolved when the portfolios=>evidences endpoint is completely integrated.
    if (level) {
      return level.name
    }
    return ''
  }

  const addEvidenceToPortFollio = (item,values) => {
    const params = {
      params: {
        skill_ids: [values?.external_skill_id],
        students_ids: [studentId],
        school_class_id: selectedClassId
      },
      evidenceId: item?.id
    }
    dispatch.classesPage.addEvidenceToPortFollio(params)
    .then((response) => {
      const obj = {
        evidenceName:item?.name,
        external_level_id:values?.external_level_id,
        id:item?.id,
        rubricRatingEnable:false,
        numericScoreEnable:false,
        score:values?.score,
        weight:values?.weight
      }
      const skillEvi = skillEvidences.filter((evi) => evi.id !== item.id);
      const otherSkills = otherSkillEvidences.filter((evi) => evi.id !== item.id)
      setSkillEvidences(skillEvi);
      setOtherSkillEvindeces(otherSkills);

      setEvidenclist((prevEvidecneList) => [...prevEvidecneList,obj])
      setIsAddEvidence((prev) => !prev);
      console.log('response',response);
    }).catch((error) => {
      console.log('error');
    })
  }

  return (
    <>
    <div className="editEvidence" style={{ display: `${open ? 'block' : 'none'}` }} id={id} open={open} anchorEl={anchorEl} placement="right-start">
      <div className="portfolioEvidenceFilter">
        <div className="portfolioGradeUpdate">
          <div className="row">
            <SelectElement
              options={formatOptions(skillLevels, emptyValue)}
              value={levelRubric}
              disabled={isReadOnly}
              handleChange={handleRubricChange}
            />
            <div className="col-lg-3 pl-1 pr-1">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  value={numericRating || ''}
                  inputProps={{ min: '0', max: '100', step: '1' }}
                  onChange={handleNumericRatingChange}
                  disabled={isReadOnly} />
              </div>
            </div>
            <div className="col-lg-3 pl-1 pr-1">
              <div className="form-group">
                <button type="button" className="btn btn-custom"
                  onClick={handleUpdateClick}
                  disabled={isReadOnly}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="suggestedWrap">
          <div className="row">
            <div className="col-lg-9 pl-1 pr-1">
              <div className="suggestedGrade">
                {/* {ratingSummary.default_external_level_id &&
                  ratingSummary.default_numeric_score && (
                    <p>
                      {`Suggested grade: ${getRubricName(
                        ratingSummary.default_external_level_id
                      )} (${ratingSummary.default_numeric_score})`}
                    </p>
                  )} */}
                {/* <span className="gradeUse"
                disabled={
                //   (!ratingSummary.default_external_level_id &&
                //     !ratingSummary.default_numeric_score) ||
                  isReadOnly
                }
                onClick={handleUseSuggestedClick}>Use Suggested?</span> */}
              </div>
            </div>
            <div className="col-lg-3 pl-1 pr-1">
              <div className="approved-box">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="approvedtd51" name="approvedtd51"
                    checked={isApproved}
                    onChange={handleStatusChange}
                    // name="isApproved"
                    disabled={isReadOnly} />
                  <label className="custom-control-label" htmlFor="approvedtd51">Approve</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolioEvidenceList">
        {evidecnelist && evidecnelist.length > 0 ? (
          <PortfolioEvidences
            evidences={evidecnelist}
            getRubricName={getRubricName}
          />
        ) : <p className='noData-wrap'>No evidence found</p>}

        <div className="button-wrapper">
          {/* <button type="button" className="btn btn-custom" onClick={() => setIsAddEvidence((prev) => !prev)}>Add Evidence</button> */}
          <button type="button" className="btn btn-black closePortfolio" onClick={resetInitialValues}>Close</button>
        </div>

      </div>
    </div>
     </>
  )
}

export default GradingPopper
