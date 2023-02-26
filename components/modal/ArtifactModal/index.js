import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Iframe from '../../shared/Iframe'
import { addProtocolURL } from '../../../utils/utils'
//import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

function ArtifactModal({ artifact, modalOpened, handleCloseModal }) {
  console.log('artifact', artifact)
  const getArtifactRenderElement = (artifactUrl, artifactType) => {
       
    const artifactURL = artifactUrl || ''
    const isFile = artifactURL.includes('s3.amazonaws.com')
    const isGoogleDoc = artifactURL.includes('docs.google.com') || artifactURL.includes('drive.google.com')
    const displayArtifact = artifactURL && (isFile || isGoogleDoc)
    console.log('artifactUrl',artifactUrl);
    if (isFile && !artifactType?.includes('video')) {
      const documents = [{ uri: artifactUrl }]
      const config = { header: { disableHeader: true } }
      return (
        <Iframe
          url={addProtocolURL(artifactUrl)}
          height="500px"
          width="100%"
        //   className={classes.artifact}
        />
      )
      // return (
      //   <DocViewer
      //     key={`${artifactUrl}-${Math.random()}`}
      //     pluginRenderers={DocViewerRenderers}
      //     documents={documents}
      //     config={config}
      //   />
      //)
    }
    // artifact provided by rails that is video
    else if (isFile && artifactType.includes('video')) {
        console.log('else if')
      return (
        <video
          src={artifactUrl}
          width="100%"
          height="100%"
          controls
        />
      )
    }
    // artifact provided by google that is video
    else if (isGoogleDoc) {
      return (
        <Iframe
          url={addProtocolURL(artifactUrl)}
          height="500px"
          width="100%"
        //   className={classes.artifact}
        />
      )
    } else {
        return (
            <Iframe
              url={addProtocolURL(artifactUrl)}
              height="500px"
              width="100%"
            //   className={classes.artifact}
            />
          )
    }
}


  return (
    <Modal
      show={modalOpened ? true : false}
      dialogClassName="feedback-modal modal-xl"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Artifact Preview </h4>
          <button type="button" className="close" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
        <div className="modal-body feedback-body">
          <div className="feedback-wrapper">
            <div className="row">
            {modalOpened && getArtifactRenderElement(
                  artifact?.service_url,
                  artifact?.content_type
            )}
                {/* <Iframe url={createArtifactUrl()} height="750px" width="100%" /> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ArtifactModal
