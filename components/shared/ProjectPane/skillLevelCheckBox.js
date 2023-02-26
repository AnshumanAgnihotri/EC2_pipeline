
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { isEmptyArray } from "../../../utils/utils";

const skillLevelCheckBox = ({ evidenceId, skillId, levels, evidence_scores }) => {
  let scores = JSON.parse(JSON.stringify(evidence_scores));

  const [evidenceScores, setEvidenceScores] = useState(scores);
  const dispatch = useDispatch();
  const checkBoxClass = {
    default: '',
    bg10: 'bg10',
    bg20: 'bg20',
    bg30: 'bg30 active',
  }
  const addSkillToPortfollio = (e) => {
    const params = {
      params: {
        evidence_scores: [
          {
            external_skill_id: e.target.dataset.skill,
            external_level_id: e.target.dataset.value,
            score: null,
            weight: 1
          }
        ]
      },
      evidenceId: evidenceId
    }
    dispatch.classesPage.updateEvidenceScoreByID(params)
      .then((response) => {
        const obj = [];
        if (!isEmptyArray(evidenceScores) && evidenceScores!= null) {
          evidenceScores.forEach(element => {
           if (element.external_skill_id === e.target.dataset.skill) {
             element.external_skill_id = e.target.dataset.skill
             element.level_id = e.target.dataset.value
             obj.push(element)
           } else {
             const element = {}
            element.external_skill_id = e.target.dataset.skill
            element.level_id = e.target.dataset.value;
            obj.push(element)
           }
          });
        } else {
          const element = {}
          element.external_skill_id = e.target.dataset.skill
          element.level_id = e.target.dataset.value;
          obj.push(element)
        }
        
         setEvidenceScores(obj);
      }).catch((error) => {
        console.log('error', error);
      })
  }
  let found = false;
  var rattingOrder = 0;
  return (
    <ul onClick={(e) => addSkillToPortfollio(e)}>
      {levels.map((level, index) => {
        rattingOrder =   10 * index + 10
        let curentClass = checkBoxClass.default;
        if (!isEmptyArray(evidenceScores && evidenceScores !==null)) {
          if (!found && evidenceScores != null) {
            found = evidenceScores.some(el => el.external_skill_id === skillId && el.level_id == level.id);
            if (found) {
              curentClass = `bg${rattingOrder} active`;
              found = true;
            } else {
              curentClass = `bg${rattingOrder}`;
              const check = evidenceScores.some(el => el.external_skill_id === skillId && el.level_id === null);
              if (check) {
                curentClass = checkBoxClass.default;
              }
            }
          }
        }
        return (
          <li key={index.toString()} data-skill={skillId} data-value={level.id} className={curentClass} title={level.name}></li>
        )
      })}
    </ul>
  )
}

export default skillLevelCheckBox;