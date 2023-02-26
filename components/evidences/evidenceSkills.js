import React, { useState,useEffect } from 'react'
import { isEmptyArray ,isEmptyObject} from '../../utils/utils'
// import PortFollioSection from './portFollioSection'
import { useDispatch, useSelector } from 'react-redux'
import SkeletonLoader from '../shared/skeletonLoader'

const evidenceSkills = ({ isOpen, onClose }) => {
  const dispatch  = useDispatch();
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const isLoading = useSelector((state) => state.loading.global)
  const evidenceSkillScore = useSelector(
    (state) => state.classesPage.evidenceSkiillScore
  )

  var levelFound = false

  return (
    <div className="skills-sidelist" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="heading-wrap">
        <h2>Skills </h2>
        <span className="closeDiv" onClick={() => onClose()}>
          <i className="fas fa-times"></i>
        </span>
      </div>
      {isLoading && <SkeletonLoader height={70} width={500} margin={'10px'} />}
      <div
        className="skillsListView"
        style={{ display: !isLoading ? 'block' : 'none' }}
      >
        <p>
          {`${evidenceSkillScore?.evidence.first_name} ${evidenceSkillScore?.evidence.last_name} (${evidenceSkillScore?.evidence?.evidence_name})`}{' '}
        </p>
        <div className="evidence-skills w-100">
          {!isEmptyObject(evidenceSkillScore) &&
            !isEmptyArray(evidenceSkillScore?.evidence) 
            ? evidenceSkillScore?.evidence?.evidence_scores.map((eviScore, index) => {
              var curentClass = ''
              var rattingOrder = 0 
              return (
                  <div className="skill-1" key={index}>
                    <span>{eviScore?.name}</span>
                    <div className="skill-list">
                    {evidenceSkillScore?.evidence?.rubric_rating_enabled === true && (
                    <ul>
                      {eviScore?.levels &&
                        !isEmptyArray(eviScore?.levels) &&
                        eviScore?.levels.map((level, key) => {
                          if (eviScore.level_id != null) {
                            rattingOrder = 10 * key + 10
                            curentClass = `bg${rattingOrder}`
                            if (eviScore.level_id == level.id) {
                              curentClass = `bg${rattingOrder} active`
                              levelFound = true
                            }
                              }
                              return (
                                <li
                                  key={key}
                                  data-index={index}
                                  className={curentClass}
                                  data-skill={eviScore.external_skill_id}
                                  data-levelid={level.id}
                                  title={level.name}
                                ></li>
                              )
                            })}
                        </ul>
                      )}
                        {evidenceSkillScore?.evidence?.numeric_score_enabled === true && ( 
                          <div className="numberType">
                          <input
                              type="text"
                              readOnly
                              name="score"
                              value={eviScore?.score}
                              onChange={(e) => scoreHandleChange(e)}
                          />
                      </div>
                        )}
                      {/* <PortFollioSection
                        evidenceId={evidenceSkillScore?.evidence.id}
                        portfollio={evidenceSkillScore?.evidence.portfolios}
                        classId={evidenceSkillScore?.evidence.school_class_id}
                        studentId={evidenceSkillScore?.evidence.student_id}
                        skillId={eviScore.external_skill_id}
                        levelId={eviScore.level_id}
                        index={index}
                        updateEvidencePortfollio={updateEvidencePortfollio}
                      /> */}
                    </div>
                  </div>
                )
              })
            : '-----'}
        </div>
      </div>
    </div>
  )
}

export default React.memo(evidenceSkills)
