import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { compose } from 'redux'
import SkillCell from './skillCell.js'

function ProgressTrackerRow({ portfollioWithSkills }) {
  const selectedClass = useSelector(
    (state) => state.schoolClasses.selectedClass
  )
  
  const childCell = (skill, isTagged = false, parentSkill) => {
    // Calculate parent identifier (key)
    let parentData = null
    // if (parentSkill) {
    //   const parentKey = [selectedClass.id, parentSkill?.id].join(
    //     '-'
    //   )
    //   const parentAltKey = [learner.id, parentSkill?.id].join('-')
    //   parentData = {
    //     id: ratings[parentKey]?.id || ratings[parentAltKey]?.id,
    //     key: ratings[parentKey] ? parentKey : parentAltKey,
    //   }
    // }

    // Calculate skill identifier (key)
    // const key = [selectedClass.id, skill.id].join('-')
    // const altKey = [skill.id].join('-')
    // const ratingSummary = null;

    return (
      <SkillCell
        key={skill.id}
        data-skill-id={skill.id}
        skill={skill}
        identifier=''
        parentSkill={parentSkill}
        selectedClassId={selectedClass?.id}
      />
    )
  }

  return (
    <tr key={''}>
       {portfollioWithSkills && portfollioWithSkills?.skill_portfolios && portfollioWithSkills?.skill_portfolios?.map((parentSkill,parentKey) => {
                  return (
                  parentSkill?.skills.map((childSkill,chiddKey) => {
                      return (
                        <Fragment key={chiddKey}>
                              {childCell(childSkill, false, portfollioWithSkills.skills)}
                         </Fragment>
                      )
                  })
                  ) 
              })}
    </tr>
  )
}

export default ProgressTrackerRow
