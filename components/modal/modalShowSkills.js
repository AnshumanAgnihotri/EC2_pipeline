import React from 'react'

import Modal from "react-bootstrap/Modal";
import { isEmptyArray } from '../../utils/utils';
export default function ModalShowSkills({
  open,
  children,
  onClose1,
  evidenceId,
  scores,
}) {

  if (!open) return null
 
  return (
    <>

      <Modal
        show={open ? true : false}
        dialogClassName="feedback-modal modal-xl"
      >
        <div className="modal-content">
         <div className="modal-header">
            <h4 className="modal-title">Skill Levels</h4>
            <button type="button" className="close" onClick={onClose1}>
              &times;
            </button>
          </div>
          <div className="modal-body feedback-body height500">
            {scores &&
            !isEmptyArray(scores) ? 
              scores.map((scorelevels, index) => {
                return (
                  <div className="levels-information" key={index}>
                    <div className="skills-list">
                            <ul >
                    {scorelevels.levels &&
                      scorelevels.levels.map((levelname, index) => {
                        return (
                          
                              <li  key={index}>
                              <h4>{levelname.name}</h4>
                              <p>{levelname.description}</p>
                              </li>
                          
                            
                        )
                      })}
                      </ul>
                           
                           </div>
                  </div>
                )
              }):<p className='noData-wrap'>No Record found</p>}
          </div>

        </div>
      </Modal>
    </>
  )
}
