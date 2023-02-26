import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from "react-bootstrap/Modal";

export default function EvidenceModal({
  open,
  children,
  onClose,
  bodyObject,
  evidenceId,
}) {
  const dispatch = useDispatch()
  // const evidenceScope = bodyObject;
  const [ddlvalue, setDdlValue] = useState([])
  useEffect(() => {
    const data = bodyObject.map((score) => {
      return {
        id:score.external_skill_id,
        value:score.level_id,
        score: null,
        weight: 1,
      }
    })
    setDdlValue(data);
  },[bodyObject])
  function handleChange(event) {
    setDdlValue([
      ...ddlvalue,
      { value: event.target.value, id: event.target.id },
    ])
  }

  if (!open) return null

  function updateScore(e) {
    const scorevalue = ddlvalue;
    const finaldata = {
      evidence_scores:
        scorevalue &&
        scorevalue.map((score) => {
          return {
            external_skill_id: score.id,
            external_level_id: score.value,
            score: null,
            weight: 1,
          }
        }),
    }
    e.stopPropagation()
    console.log('finaldata',finaldata)
    dispatch.classesPage.updateEvidenceScoreByID({
      evidenceId: evidenceId,
      params: finaldata,
    }).then((response) => {
      onClose();
    }).catch((error) => {
      console.log('error error');
    })
  }

  console.log('bodyObject',bodyObject)

  return (
    <>
      {/* <div className="overlay_style"></div> */}
      {/* <div className="modal_style"> */}
      {/* {bodyObject.name}
       */}
       

        {/* <form onSubmit={handleSubmit}> */}
       
          <Modal
        show={open ? true : false}
        dialogClassName="modal-dialog custom-modal width450"
      >
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{bodyObject.name} SCORES</h4>
              </div>
              <div className="modal-body">
                <div className="scores-tabs">
                  <ul>
                    {bodyObject &&
                      bodyObject.map((score, i) => (
                        <li key={i.toString()}>
                          {score.name}
                          <div className="selectBox">
                            <select
                              id={score.external_skill_id}
                              data-id={i}
                              onChange={handleChange}
                            >
                              <option value="0">Select </option>
                              {score.levels &&
                                score.levels.map((level,index) =>
                                  level.id === score.level_id ? (
                                    <option key={index} selected={true} value={level.id}>
                                      {level.name}{' '}
                                    </option>
                                  ) : (
                                    <option key={index} value={level.id}>
                                      {level.name}{' '}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="modal-buttons d-flex justify-content-center align-items-center p-4">
                  {/* <button type="button" class="smallbtn btn-black btn-close" data-dismiss="modal">Cancel</button> */}
                  <button
                    className="smallbtn btn-black btn-close"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={updateScore}
                    className="smallbtn btn btn-save"
                    data-dismiss="modal"
                  >
                    Update
                  </button>
                  {/* <input type="submit" value="Submit" /> */}
                </div>
              </div>
            
        {/* </form> */}
        {/* </div> */}
      </div>
      </Modal>
    </>
  )
}
