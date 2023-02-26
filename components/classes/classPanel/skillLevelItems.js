
const SkillLevelItems = ({ skillLevels, handleCloseLevels }) => {
    return (
        <div className="skills-box" style={{ display: skillLevels?.isShow ? 'block' : 'none' }}>
            <div className="heading-wrap">
                <h2>{skillLevels?.name}</h2>
                <span className="closeDiv" id="closeSkills" onClick={() => handleCloseLevels()}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            <div className="skills-list scrollBar learnerMiddleHeight">
                <ul>
                    {
                        skillLevels?.levels && skillLevels?.levels.length > 0 ? skillLevels?.levels.map((level, i) => {
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