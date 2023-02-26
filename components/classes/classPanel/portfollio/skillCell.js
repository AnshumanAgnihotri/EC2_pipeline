import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import GradingPopper from './gradingPopper'

function SkillCell({
  skill,
  identifier,
  parentSkill,
  selectedClassId,
  ...props
}) {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const user = useSelector((state) => state.user)
  const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
  const showCount = useSelector((state) => state.classesPage.showCount)
  const handleCellClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopperClose = () => {
    setAnchorEl(null)
    // Reset portfolio evidences element in the store
    dispatch.classesPage.setPortfolioEvidences(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'popover' : undefined

  const LEVEL_CATEGORIES = ['lowest', 'lowest', 'mid', 'highest']

  const getLevelCategory = (level, length) => {
    console.log('level category',level,length);
    let levelCategory = ''
    // Return the highest color on the highest level
    if (level === length) {
      levelCategory = LEVEL_CATEGORIES[LEVEL_CATEGORIES.length - 1]
      // If the levels length is less than the categories length, find it by index
    } else if (length <= LEVEL_CATEGORIES.length - 1) {
      levelCategory = LEVEL_CATEGORIES[level]
      // If the levels length is greater than the categories length, reduce the level number to a 1 to 3 range
    } else {
      level = level - Math.floor(level / 2)
      if (level < LEVEL_CATEGORIES.length)
        levelCategory = LEVEL_CATEGORIES[level]
      else levelCategory = LEVEL_CATEGORIES[LEVEL_CATEGORIES.length - 1]
    }
    return levelCategory
  }

  if (skill) {
    const evidences_count = skill?.skill?.evidences.length;
    const  skilkWithLevels = parentSkill[skill?.skill.id];
    const approved = skill?.approved
    const currentLevel = skill?.skill?.latest_student_rating?.external_level_id;
    const levelName = skill?.skill?.latest_rating.level_name || ''
    let levelClass = 'unrated';
    const score =  skill?.skill?.latest_rating.score || ''
    const levelIds = skilkWithLevels.levels ? skilkWithLevels.levels.map((level) => level.id) : []
    if (currentLevel && levelIds.includes(currentLevel)) {
      const levelIndex = levelIds.indexOf(currentLevel)
      levelClass = getLevelCategory(levelIndex + 1, levelIds.length)
    }
    // console.log('parentSkill[skill?.skill?.id?.levels]',parentSkill[skill?.skill?.id])

    return (
      <>
        <td className={levelClass}>
          <div
            class={`text-box ${showCount ? 'showCount' : ''} ${
             0 ? `${approved ? 'statusBlue' : 'statusShow statusBlue'}`
             : `statusShow`
            }`}
          >
            {!approved && (
              <span class="statusPoint">
                {' '} {evidences_count}
              </span>
            )}
            <div
              class={`statusText ${approved ? ' approveskill' : ''} `}
              onClick={handleCellClick}
            >
              <div class="sText">
                {!approved && levelName && levelName}
                <span class="statusCount">
                  {' '}
                  {!approved && score ? `(${score})` : ''}
                </span>
              </div>
              {approved && (
                <>
                  <i class="far fa-check-circle"></i>{' '}
                  <small>
                    {levelName} {score ? `(${score})` : ''}
                  </small>
                </>
              )}
            </div>
            {/* {open && (
              <GradingPopper
                id={id}
                open={open}
                anchorEl={anchorEl}
                handleClose={handlePopperClose}
                skillLevels={parentSkill[skill?.skill?.id]?.levels}
                portfolioKey={identifier}
                selectedClassId={selectedClassId}
                skill={skill}
              />
            )} */}
          </div>
        </td>
      </>
    )
  }



  return (
    <td {...props} className={'unassigned'}>
      <div class="text-box">
        <span class="statusText"></span>
      </div>
    </td>
  )
}

export default SkillCell
