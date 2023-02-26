import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Modal from "react-bootstrap/Modal";

export default function Modalcomments({
  open,
  children,
  onClose,
  bodyObject,
  evidenceId,
}) {
  const dispatch = useDispatch()
  if (!open) return null
  const [contents, setContents] = useState('')
  function savecomment(e) {
    e.stopPropagation()
    const value = e.target.value
    dispatch.classesPage.updateEvidenceScoreByID({
      comment: {
        content: contents,
        type: value,
        response: '',
        evidence_ids: evidenceId,
        school_class_id: '',
      },
    })
  }

  console.log('evidenceId',evidenceId)
  return (
    <>
     <Modal
        show={open ? true : false}
        dialogClassName="modal-dialog custom-modal width650">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Comment</h4>
              </div>
              <div className="modal-body">
                <div className="comments-box">
                  <label>Enter your comment for 2 selected.</label>
                  <textarea
                    className="form-control"
                    value={contents}
                    onChange={(e) => {
                      setContents(e.target.value)
                    }}
                    name="content"
                  ></textarea>
                </div>
                <div className="modal-buttons d-flex justify-content-end align-items-center p-4">
                  <button
                    type="button"
                    className="smallbtn btn-black btn-close"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="smallbtn btn btn-save"
                    onClick={savecomment}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

          </Modal>
    </>
  )
}
