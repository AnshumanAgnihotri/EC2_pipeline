
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmptyObject } from "../../utils/utils";
import SkeletonLoader from "../shared/skeletonLoader";
import SkillTableRow from "./skillTableRow";

const Skill = () => {
    const dispatch = useDispatch();
    const portfolio = useSelector((state) => state.combinedPortfollioPage.combinedPortfollio);
    const [categoryClickedId, setCategoryClickedID] = useState('')
    const [iscategoryClicked, setIsCategoryClicked] = useState(false);

    useEffect(() => {
        dispatch.combinedPortfollioPage.getCombinedPortfollio();
    }, []);

    const isLoading = useSelector((state) => state.loading.global)

    const handleCategoryClicked = (key) => {
        setCategoryClickedID(key)
        key === categoryClickedId
            ? setIsCategoryClicked((prev) => !prev)
            : setIsCategoryClicked(true)
    }
    return (
        <div class="accordion md-accordion" id="classaccordion" role="tablist" aria-multiselectable="true">
            {isLoading && (
                <SkeletonLoader
                    height={100}
                    width={1500}
                    marginLeft={'10px'}
                    margin={'10px'}
                />
            )}
            <div style={{display:isLoading?'none':'block'}}>
            {!isEmptyObject(portfolio) &&
                Object.keys(portfolio.skills).map((skill, skillKey) => {
                    return (
                        <div className="card" key={skillKey}>
                            <div className="card-header" role="tab">
                                <a
                                    className={`card-link ${categoryClickedId == skillKey && iscategoryClicked
                                        ? ''
                                        : 'collapsed'
                                        }`}
                                    data-parent="#classaccordion"
                                    aria-expanded={
                                        categoryClickedId == skillKey && iscategoryClicked == true
                                            ? true
                                            : false
                                    }
                                    onClick={handleCategoryClicked.bind(this, skillKey)}
                                >
                                    {skill}
                                </a>
                            </div>
                            {/* <ul class="combine-breadcrumb teachercombinebread">
                  <li><a href="#"><i class="fas fa-home"></i></a></li>
                  <li><a href="#">Category Level 1</a></li>
                  <li><a href="#">Category Level 2</a></li>
                  <li>Category Level 3</li>
                </ul> */}
                            <div
                                className={`collapse ${categoryClickedId == skillKey && iscategoryClicked == true
                                    ? 'show'
                                    : ''
                                    }`}
                                role="tabpanel"
                                aria-labelledby="headingclass1"
                                data-parent="#classaccordion"
                            >
                                <div className="card-body dataListWrap skillViewBox scrollBarList pt-0">
                                    <ul className="mb-0">
                                        {portfolio.skills[skill].map((parentSkill, parentKey) => {
                                            if (parentSkill?.skill) {
                                                return (
                                                    <li key={parentKey} >
                                                        <div className="second-datalist">
                                                            <span className="checkListIcon">
                                                                <i class="fas fa-circle"></i>
                                                            </span>
                                                            {/* <span className="checkListIcon checked">
                                                                <i className="far fa-check-circle"></i>
                                                            </span> */}
                                                            <h3>{parentSkill?.skill?.name}</h3>
                                                            <SkillTableRow
                                                                key={parentKey}
                                                                skill={parentSkill?.skill}
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            }
                                            return (
                                                <li key={parentKey}>
                                                    <div className="first-datalist">
                                                        {/* <span className="checkListIcon">
                                                            <i class="fas fa-circle"></i>
                                                            </span> */}
                                                        <span className="checkListIcon checked">
                                                            <i className="far fa-check-circle"></i>
                                                        </span>
                                                        <h3>{parentSkill?.parent}</h3>
                                                        {parentSkill?.parent_skill &&
                                                            <SkillTableRow
                                                                key={parentKey}
                                                                skill={parentSkill?.parent_skill?.skill}
                                                            />
                                                        }
                                                    </div>
                                                    <ul className="mb-0">
                                                        {parentSkill?.skills != undefined &&
                                                            parentSkill?.skills.map(
                                                                (childSkill, childKey) => {
                                                                    return (
                                                                        <li >
                                                                            <div className="second-datalist">
                                                                                <span className="checkListIcon">
                                                                                    <i class="fas fa-circle"></i>
                                                                                </span>
                                                                                {/* <span className="checkListIcon checked">
                                                                                    <i className="far fa-check-circle"></i>
                                                                                </span> */}
                                                                                <h3>{childSkill?.skill?.name}</h3>
                                                                                <SkillTableRow
                                                                                    key={childKey}
                                                                                    name={childSkill?.skill?.name}
                                                                                    skill={childSkill?.skill}
                                                                                />
                                                                            </div>
                                                                        </li>
                                                                        )
                                                                }
                                                            )}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
        </div>
    )
}

export default Skill