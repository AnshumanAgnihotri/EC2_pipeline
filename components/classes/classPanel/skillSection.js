import { valHooks } from 'jquery';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { isEmptyArray } from "../../../utils/utils";


const SkillSection = (props) => {
    const dispatch = useDispatch();
    const { skillLists,isNumericRating,isRubricRating,schoolSkills,key } = props;
    var rattingOrder = 0;
    const [moreSkillRow, setMoreSkillRow] = useState('')
    const moreLessHandler = (key, status) => {
        setMoreSkillRow(status === 1 ? '' : key)
    }

    return (
        <div className="project-view-skill">
            {skillLists && skillLists.map((skill, index) => {
                const skillInfo = schoolSkills[skill.skill_id];
                var levelFound = false;
                var curentClass = '';
                return (
                    <>
                        <div className={`skill-1 ${index > 2
                                ? moreSkillRow !== key
                                    ? 'hide'
                                    : ''
                                : ''
                            }`} key={index}>
                            <span title={skillInfo.name} onClick={() => {
                                 dispatch.dashboard.commentAction({ status: false, evidence: {},skills:{} });
                                 dispatch.dashboard.artifactAction(false);
                                 dispatch.dashboard.skillLevelAction({ isShow: true, name: skillInfo.name, levels: skillInfo?.levels })
                            }}>{skillInfo.name}</span>
                            <div className="skill-list">
                                {isRubricRating == true &&
                                <ul>
                                    {skillInfo?.levels && !isEmptyArray(skillInfo?.levels) && skillInfo?.levels.map((level, key) => {
                                        if (skill.level_id != null) {
                                            rattingOrder = 10 * key + 10
                                            curentClass = `bg${rattingOrder}`;
                                            if (skill.level_id == level.id) {
                                                curentClass = `bg${rattingOrder} active`;
                                                levelFound = true;
                                            }
                                        }
                                        return <li key={key} className={curentClass} data-toggle="tooltip" data-placement="top" title={level.name}></li>
                                    })}
                                </ul>
                                }
                                {isNumericRating == true &&
                                    <div className="numberType"><input value={skill?.score} disabled /></div>
                                }
                                </div>
                        </div>
                        {index > 2 &&
                            index ===
                            skillLists.length - 1 && (
                                <div className="more-skills">
                                    <span
                                        className={`${moreSkillRow === key
                                                ? 'hideSkill'
                                                : 'showSkill'
                                            }`}
                                        style={{ display: 'block' }}
                                        onClick={() =>
                                            moreLessHandler(
                                                key,
                                                moreSkillRow === key ? 1 : 2
                                            )
                                        }
                                    >
                                        {moreSkillRow === key
                                            ? 'Less Skill'
                                            : 'More skills'}
                                    </span>
                                </div>
                            )}
                    </>
                )
            })}
        </div>
    )
}

export default SkillSection