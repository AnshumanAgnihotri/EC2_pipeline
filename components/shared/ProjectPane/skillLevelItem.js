
const SkillLevelItems = ({ skillName,isSkillLevelVisible,skillLevels,handleSkillClose }) => {
    return (
        <div className="skills-box" style={{ display: isSkillLevelVisible ? 'block' : 'none' }}>
        <div className="heading-wrap">
          <h2>{skillName}</h2>
          <span className="closeDiv" id="closeSkills" onClick={() =>handleSkillClose()}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="skills-list scrollBar projectHeightBar">
            <ul>
                {
                    skillLevels && skillLevels.length > 0 ? skillLevels.map((level, i) => {
                        return (
                            <li key={`skillLevels${i}`}>
                                <h3>{level.name}</h3>
                                <p>{level.description}</p>
                            </li>
                        )
                    }) : <p>Skill level not found !!</p>
                }
            </ul>
        </div>
        </div>
    )
}

export default SkillLevelItems;