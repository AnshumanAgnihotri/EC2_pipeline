import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import GoogleApi from '../../utils/google_api.js'
import axios from 'axios'
export default function ModalArtifact({
  open,
  children,
  onClose1,
  evidenceId,
}) {
  // const dispatch = useDispatch()

  if (!open) return null
  const [atrifactImagePath, setArtifactImagePath] = useState()
  // const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  useEffect(() => {
    callGoogleDocs()
    // console.log("image path : ",atrifactImagePath)
  }, [])

  function callGoogleDocs() {
    const googleapi = new GoogleApi()
    googleapi.getServiceAccountKey((accessToken, expiry) => {
      console.log('Access Token ', accessToken)
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      axios
        .get(
          'https://www.googleapis.com/drive/v3/files/1_NaCAOEJ2-zfOA01tXrgM4g7HirJFsV8j-w8TbIDpng?fields=*',
          { headers }
        )
        .then((response) => {
          console.log('response from google', response.data.webViewLink)
          setArtifactImagePath(response.data.webViewLink)
          // setArtifactImagePath("https://docs.google.com/document/d/1tZz4BaKH0w1zHU8uS0FUnlBWjHiBbUmRO6-QDTBroOE/edit?usp=sharing")
        })
    })
  }

  return (
    <>
      <div className="overlay_style"></div>
      <div className="modal" id="modalScore">
        <div className="modal-dialog feedback-modal modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Hello artifact</h4>
              <button type="button" className="close" onClick={onClose1}>
                &times;
              </button>
            </div>
            <div className="modal-body feedback-body height500">
              <iframe src={atrifactImagePath} height="880" width="940"></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
