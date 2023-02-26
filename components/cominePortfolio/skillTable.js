import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableHeader from "./tableHeader"
import Skill from "./Skill"
import Comment from "./comment"
import EvidenceSideBarItems from "./EvidenceSideBarItems";


const SkillTable = () => {
    const dispatch = useDispatch();
  
    const evidenceAction = useSelector(
        (state) => state.combinedPortfollioPage.showEvidence
    )

    console.log('evidenceAction',evidenceAction)

    const showComment = useSelector(
        (state) => state.combinedPortfollioPage.showComment
    )

    const handleClose = () => {
        dispatch.combinedPortfollioPage.evidenceAction({ isShowEvidence: false, evidences: [] })
    }

    useEffect(() => {
        return () => {
            handleClose()
        }
    }, [])

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 left-side-wrap" style={{
                    display: !evidenceAction?.isShowEvidence || !showComment ? 'block' : 'none',
                }}>
                    {/* <Comment /> */}
                    {evidenceAction?.isShowEvidence && <EvidenceSideBarItems evidence={evidenceAction} onClose={handleClose} />}
                </div>
                <div class={`combinePortfolio-wrapper  p-0 ${evidenceAction?.isShowEvidence || showComment ? 'col-lg-8':'col-lg-12'}`}>
                    <TableHeader />
                    <Skill />
                </div>
            </div>
        </div>
    )
}
export default SkillTable