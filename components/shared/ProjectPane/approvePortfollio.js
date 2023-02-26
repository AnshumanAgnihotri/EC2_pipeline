import { isEmptyObject } from "jquery";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { approveText } from "../../../utils/utils";

const approvePortFolio = ({ index, skillId, portfollio, classId }) => {
  console.log('portfollio state',portfollio);
  const dispatch = useDispatch();
  let approve = JSON.parse(JSON.stringify(portfollio));
  const [portFollioData, setPortFollioData] = useState(approve);
  let status='';
  const approveHandler = (e) => {
    if (e.target.checked) {
     status = approveText.approved;
      let data = approve.map((item) => {
        if (item.portfolio_id == e.target.value && item.approved === false) {
          item.approved = true;
        }
        return item
      })
      setPortFollioData(data);
    } else {
      status =  approveText.unapproved;
      let data = approve.map((item) => {
        if (item.portfolio_id == e.target.value && item.approved === true) {
          item.approved = false;
        }
        return item;
      })
      setPortFollioData(data);
    }
    dispatch.classesPage.approvePortFolio({
      classId: classId,
      portfolioId: e.target.value,
      changeStatus: true,
      params: { rating_type: status },
    })

  }

  return (
    <div className="approved-box">
      <div className="custom-control custom-checkbox">
        <input 
          type="checkbox" 
          className="custom-control-input"
          id={`approved-${index}`} 
          value={portFollioData.find((value) => value.skill_id === skillId)?.portfolio_id} 
          name="approved" 
          checked={portFollioData.find((value) => value.skill_id === skillId)?.approved === true ? true : false} 
          disabled={isEmptyObject((portFollioData)) ? true:portFollioData.find((value) => value.skill_id === skillId) ? false:true} 
          onChange={(e) => approveHandler(e)}></input>
        <label className="custom-control-label" htmlFor={`approved-${index}`} >Approve</label>
      </div>
    </div>
  )
}

export default approvePortFolio