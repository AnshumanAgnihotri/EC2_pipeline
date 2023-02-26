import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import SkeletonLoader from "../../../shared/skeletonLoader";
import { isEmptyArray } from "../../../../utils/utils";
import TableHeder from './tableHeader';
import ProgressTrackerRow from "./progressTrackerRow";
import { useRouter } from 'next/router'
import { isEmptyObject } from "jquery";

const Index = ({ open }) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const routerTermID = router.query.termID
    const currentclass = useSelector((state) => state.schoolClasses.selectedClass);
    const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm);
    const portfollio = useSelector((state) => state.dashboard.portfollios);
    useEffect(() => {
        if (selectedTerm && currentclass) {
            const params = {
                termId:routerTermID,
                classId:currentclass?.id
             }
            //  if (!portfollio) {
                dispatch.dashboard.getPortfollio(params);
            //  }
        }

    },[selectedTerm,currentclass]);

    const { getPortfollio} = useSelector((state) => state.loading.effects.dashboard)

    return (
        
        <div className="class-detailsBox" style={{ display: open ? 'block' : 'none' }}>
            <div className="subheading-wrap p-4">
                {/* <h2>Biomimicry Innovation</h2> */}
            </div>
            {getPortfollio && 
             <SkeletonLoader
             height={100}
             width={1500}
             marginLeft={'10px'}
             margin={'10px'}
         />
        }
            <div className="learner-detailswrap" style={{ display: getPortfollio ? 'none' : 'block' }}>
                {/* <div className="learner-shortInfo">
                    <ul>
                        <li>
                            <div className="outcome-skills">
                                <div className="outcomeSkill">Mastery (98)<span><i className="fas fa-cog"></i></span></div>
                            </div>
                        </li>
                        <li><span className="c_status">On Track</span></li>
                        <li>
                            <div className="openComments">
                                <span className="mr-2"><i className="far fa-comments"></i></span>
                                2 Comments
                            </div>
                        </li>
                    </ul>
                </div> */}
                {!isEmptyObject(portfollio) && !isEmptyArray(portfollio?.skill_portfolios) ? 
                <div className="table-responsive scrollBarList">
                    <table className="table portfolio-table ">
                        <TableHeder portfollio={portfollio?.skill_portfolios} />
                        <tbody>
                            <tr>
                            {portfollio && portfollio?.skill_portfolios && portfollio?.skill_portfolios?.map((parentSkill,parentKey) => {
                               return (
                                parentSkill?.skills.map((childSkill,chiddKey) => {
                                    return (
                                        <td className="bodycol"><div className="headText-box">{childSkill?.skill?.name}</div></td>
                                    )
                                })
                               ) 
                            })}
                            </tr>
                                <ProgressTrackerRow portfollioWithSkills={portfollio} />
                        </tbody>
                    </table>
                </div>
                :<p className="noData-wrap">
                No record found
              </p>}
            </div>
        </div>
    )
}

export default Index