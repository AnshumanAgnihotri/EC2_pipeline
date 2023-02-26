import ApprovePortfollio from "./approvePortfollio"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { isEmptyObject } from "jquery";
import { approveText } from "../../../utils/utils";

const PortFollioSection = (props) => {
  const dispatch = useDispatch();
  const {
    evidenceId,
    classId,
    studentId,
    skillId,
    portfollio,
    index,
    numericScoreEnabled,
    rubricRatingEnabled } = props;
  let portfollioData = JSON.parse(JSON.stringify(portfollio));
  const [portfollioInfo, setPortfollioInfo] = useState(portfollioData)
  const addSkillToPortfollio = (eId, classId, studentId, skillId) => {
    const params = {
      params: {
        skill_ids: [skillId],
        students_ids: [studentId],
        school_class_id: classId
      },
      evidenceId: eId
    }
    dispatch.classesPage.addEvidenceToPortFollio(params)
      .then((response) => {
        const result = response.data.map((item) => {
          return { ...item, approved: false }
        })
        setPortfollioInfo((portfollioInfo) => [...portfollioInfo, ...result])
      }).catch((error) => {
        console.log('error', error);
      })
  }
  let status = '';
  const approveHandler = (e) => {
    if (e.target.checked) {
      status = approveText.approved;
      let data = portfollioInfo.map((item) => {
        if (item.portfolio_id == e.target.value && item.approved === false) {
          item.approved = true;
        }
        return item
      })
      setPortfollioInfo(data);
    } else {
      status = approveText.unapproved;
      let data = portfollioInfo.map((item) => {
        if (item.portfolio_id == e.target.value && item.approved === true) {
          item.approved = false;
        }
        return item;
      })
      setPortfollioInfo(data);
    }
    dispatch.classesPage.approvePortFolio({
      classId: classId,
      portfolioId: e.target.value,
      changeStatus: true,
      params: { rating_type: status },
    })

  }

  return (
    <>
      {numericScoreEnabled === true && <div className="numberType"><input type="number" min="0"
        onKeyPress={(e) => {
          if (e.code === 'Minus')
            e.preventDefault()
          // var t= e.target.value
          // (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
        }} />
      </div>
      }
      {portfollioInfo.find((value) => value.skill_id == skillId)
        ?
        <span className="portfolioChecked" title="added in portfollio"><i className="far fa-check-circle"></i></span>
        : <div
          className="addPortfolio"
          data-toggle="tooltip"
          data-placement="top"
          title="Add Portfolio"
          disabled={true}
          onClick={() => {
            addSkillToPortfollio(evidenceId, classId, studentId, skillId)
          }}
        >
          <span><i className="fa fa-plus"></i></span>
        </div>
      }

      <div className="approved-box">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={`approved-${index}`}
            value={portfollioInfo.find((value) => value.skill_id === skillId)?.portfolio_id}
            name="approved"
            checked={portfollioInfo.find((value) => value.skill_id === skillId)?.approved === true ? true : false}
            disabled={isEmptyObject((portfollioInfo)) ? true : portfollioInfo.find((value) => value.skill_id === skillId) ? false : true}
            onChange={(e) => approveHandler(e)}></input>
          <label className="custom-control-label" htmlFor={`approved-${index}`} >Approve</label>
        </div>
      </div>
      {/* <ApprovePortfollio skillId={skillId} portfollio={portfollioInfo} index={index} classId={classId} /> */}
    </>
  )
}

export default PortFollioSection