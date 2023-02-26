import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

import Iframe from '../../../shared/Iframe/Iframe'
import { addProtocolURL } from '../../../../utils/utils'
import SkeletonLoader from '../../../shared/skeletonLoader';

const index = (props) => {
    const dispatch = useDispatch();
    const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm);
    const isLoading = useSelector((state) => state.loading.global)
    const {name, evidenceID, open, artifact, onClose, setIsExpand, isExpand, artifactUpdateHandler } = props;
    let artifactData = JSON.parse(JSON.stringify(artifact));
    const [isDocsUpdateVisible, setIsDocsUpdateVisible] = useState(false);
    const [isActionButtonVisible, setIsActionButtonVisible] = useState(true)
    const [fileExtn, setFileExtn] = useState('')
    const [isextnMatch, setIsextnMatch] = useState(false)
    // const [isFilesize, setIsFilesize] = useState(false)
    const [filesize, setFilesize] = useState()
    const [selectedFile, setSelectedFile] = useState('')
    const [optionVal, setOptionVal] = useState('file');
    const [linkURL, setlinkURL] = useState('')
    const [fileError, setFileError] = useState('');
    const [linkError, setLinkError] = useState('');
    const [artifactInfo, setArtifactInfo] = useState({});

    useEffect(() => {
        setArtifactInfo(artifactData)
        setIsDocsUpdateVisible(false)
        setIsActionButtonVisible(true)
    }, [evidenceID])

    useEffect(() => {
        { (optionVal == 'file') ? setlinkURL('') : setSelectedFile(''); }
    }, [selectedFile, linkURL])

    function updateClickButton() {
        setIsUrlValid(false);
        setSelectedFile('')
        setlinkURL('')
        setIsUrlValid(false);
        setLinkError('');
        setIsDocsUpdateVisible((prev) => !prev)
        setIsActionButtonVisible((prev) => !prev)
    }

    const deleteAttachArtifact = () => {
        dispatch.classesPage.deletAttachArtifactEvidence({ termId:selectedTerm?.id,evidenceid: evidenceID })
            .then((response) => {
                if (response) {
                    setArtifactInfo({});
                    setIsDocsUpdateVisible(false)
                    const artifactObj = {
                        artifact:{},
                        evidenceId:evidenceID,
                        action:'delete'
                    }
                    artifactUpdateHandler(artifactObj);
                }
            }).catch((error) => {
                console.log('error');
            })
    }

    const [isUrlValid, setIsUrlValid] = useState(false);
    const urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(URL);
    };


    const handleAttachSubmission = () => {
        const formData = new FormData()
        if (selectedFile != '' && selectedFile != undefined) {
            formData.append('evidence[attachment]', selectedFile)
        } else {
            const isTrueVal = !linkURL || urlPatternValidation(linkURL);
            if (!isTrueVal) {
                setIsUrlValid(true);
                setLinkError('URL is not valid');
                return;
            } else {
                const checkIsUrlHttp = (linkURL.indexOf("http://") == 0 || linkURL.indexOf("https://") == 0)
                if (!checkIsUrlHttp) {
                    setIsUrlValid(true);
                    setLinkError('URL should be included http or https (https://www.example.com)');
                    return;
                }
            }
            setIsUrlValid(false);
            setLinkError('');
            formData.append('evidence[url]', linkURL)
        }
        dispatch.classesPage.addArtifact({
            termId:selectedTerm?.id,
            evidenceid: evidenceID,
            formvalue: formData,
        }).then((response) => {
            setIsUrlValid(false);
            setLinkError('');
            setSelectedFile('');
            setlinkURL('');
            setArtifactInfo(response.data.attachment)
            const artifactObj = {
                artifact:response.data.attachment,
                evidenceId:evidenceID,
                action:'add_update'
            }
            artifactUpdateHandler(artifactObj);
            setIsActionButtonVisible((prev) => !prev)
            setIsDocsUpdateVisible(false)
        }).catch((error) => {
            setIsUrlValid(false);
            setLinkError('');
            console.log('error', error)
        })
    }

    const changeFileHandler = (e) => {
        setSelectedFile(e.target.files[0])
        var files = e.target.files[0];
        var extension = files.name.split('.').pop();
        var fileSize = files.size;
        setFileExtn(extension)
        setFilesize(fileSize)
        // var filesArray = [].slice.call(files);
        // var maxfilesize = process.env.NEXT_PUBLIC_GOOGLE_FILE_SIZE;
        var filetype = process.env.NEXT_PUBLIC_GOOGLE_FILE_TYPE;
        //setMasterFtype(process.env.NEXT_PUBLIC_GOOGLE_FILE_TYPE)
        setIsextnMatch(false)
        var fileTypeArray = filetype.split(',')
        // filesArray.forEach(e => {
        //   var name =e.name;
        //   var size = e.size;
        //   var type = e.type;
        // });
        // if (fileSize <= maxfilesize) {
        //   setIsFilesize(true)

        // }

        for (let i = 0; i < fileTypeArray.length; i++) {
            if (fileTypeArray[i].toLocaleLowerCase() === extension.toLocaleLowerCase()) {
                setIsextnMatch(true)
                break
            }
            else {
                setIsextnMatch(false)
            }
        }
        // setIsSelected(true)
    }

    const getArtifactRenderElement = (artifactUrl, artifactType) => {
        if (artifactUrl && artifactType) {
            const artifactURL = addProtocolURL(artifactUrl || '')
            const isFile = artifactURL.includes('s3.amazonaws.com')
            const isGoogleDoc = artifactURL.includes('docs.google.com') || artifactURL.includes('drive.google.com')
            if (isFile && !artifactType?.includes('video')) {
                // console.log('first if')
                const documents = [{ uri: artifactUrl, fileType: artifactType }]
                const config = { header: { disableHeader: true } }
                return (
                    <DocViewer
                        key={`${artifactUrl}-${Math.random()}`}
                        pluginRenderers={DocViewerRenderers}
                        documents={documents}
                        config={config}
                    />
                )
            }
            // artifact provided by rails that is video
            else
                if (isFile && artifactType.includes('video')) {
                    return (
                        <video
                            //   className={classes.artifact}
                            src={addProtocolURL(artifactUrl)}
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
                        />
                    )
                }
                else {
                    return (
                        <Iframe
                            url={addProtocolURL(artifactUrl)}
                            height="500px"
                            width="100%"
                        />
                    )
                }
        }
    }
    const handleExpands = () => {
        setIsExpand((prev) => !prev);
    }


    return (
        <>
            <div className="artifact-preview-box" style={{ display: open ? 'block' : "none" }}>
                <div className="heading-wrap">
                    <h2 >Artifact Preview</h2>
                    <div class="artifact-actions">
                        <ul>
                            <li>
                                <span class="expandArtifact" onClick={() => handleExpands()} style={{ display: isExpand ? 'none' : 'block' }}><i class="fas fa-expand"></i></span>
                                <span class="compressArtifact" onClick={() => handleExpands()} style={{ display: isExpand ? 'block' : 'none' }}><i class="fas fa-compress"></i></span>
                            </li>
                            <li><span id="closeArtifactPreview" onClick={() => onClose()}><i class="fas fa-times"></i></span></li>
                        </ul>
                    </div>
                </div>
                {isLoading && <SkeletonLoader height={70} width={500} margin={'10px'} />}
                <div className="feedback-pictures scrollBar learnerMiddleHeight" style={{ display: !isLoading ? 'block' : 'none' }}>
                    <span className='docHead'>{name}</span>
                    {getArtifactRenderElement(
                        artifactInfo?.service_url,
                        artifactInfo?.content_type
                    )}
                    {artifactInfo?.service_url ?
                        <div className="doc-box" style={{ display: isActionButtonVisible === true ? 'block' : 'none', }}>
                            <span className="image-icon"><i className="fas fa-file-image"></i> </span>
                            <span className="uploded-text"><i>{artifactInfo.service_url}</i> </span>
                        </div>
                        : isActionButtonVisible ? <div className="noData-wrap" style={{height:'100px'}}>Artifact not found</div> : ''}
                    <div className="actionButtons" style={{ display: isActionButtonVisible === true ? 'flex' : 'none', }}>
                        {(() => {
                            let artifact = artifactInfo?.service_url
                            if (artifact) {
                                return (
                                    <>
                                        <button type="button" className="btn-delete" onClick={deleteAttachArtifact} disabled={!artifactInfo?.service_url ? true : false}>Delete </button>
                                        <button type="button" onClick={updateClickButton} className="btn-update"> Update</button>
                                        <button type="button" className="btn-view" target="_blank" onClick={() => handleExpands()} disabled={!artifactInfo?.service_url ? true : false}>View </button>
                                    </>
                                )
                            } else {
                                return (
                                    <button type="button" onClick={updateClickButton} className="btn-update">Add</button>
                                )
                            }
                        })()}
                    </div>
                    <div className="evidence-container">
                        <div className="feedback-update" style={{ display: isDocsUpdateVisible === true ? 'block' : 'none', }}>
                            <h3>Attach Evidence From</h3>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="radio-buttons">
                                        <h4>Do you want to select ?</h4>
                                        <div className="radio-groups">
                                            <div className="radio-1">
                                                <input type="radio" id="file" name="radioType" value="file" checked={optionVal === 'file' ? true : false} onChange={(e) => setOptionVal(e.target.value)} />
                                                <label htmlFor="file">File</label>
                                            </div>
                                            <div className="radio-1">
                                                <input type="radio" id="link" name="radioType" value="link" checked={optionVal === 'link' ? true : false} onChange={(e) => setOptionVal(e.target.value)} />
                                                <label htmlFor="link">Link</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12" style={{ display: optionVal === 'file' ? 'block' : 'none' }}>
                                    <div className="form-group">
                                        <label><span><i className="fas fa-file"></i></span>Computer file</label>
                                        <input type="file" className="form-file" onChange={(e) => changeFileHandler(e)} />
                                    </div>
                                </div>
                                <div className="col-lg-12" style={{ display: optionVal === 'link' ? 'block' : 'none' }}>
                                    <div className="form-group">
                                        <label><span><i className="fas fa-link"></i></span>Add a link</label>
                                        <input type="text" className="form-control" onChange={(e) => setlinkURL(e.target.value)}
                                            value={linkURL} placeholder="Paste any url here..." />
                                        {isUrlValid && <p role="alert" class="errorMsg text-danger">{linkError}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="actionButtons">
                                <button type="button" className="btn-delete" id="cancelButton" onClick={updateClickButton}>Cancel</button>
                                <button type="button" className="btn-update" onClick={handleAttachSubmission} disabled={!selectedFile && !linkURL ? true : false} >Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default index;