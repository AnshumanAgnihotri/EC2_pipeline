
import { useState } from "react";
import { isEmptyArray } from "../../utils/utils";
const EvidenceSideBarItems = ({ evidence, onClose }) => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    const [isAddEvidence, setIsAddEvidence] = useState(false)
    return (
        <div class="outcome-skillUpdate evidenceSkillUpdate" style={{ display: evidence?.isShowEvidence ? 'block' : 'none' }}>
        <div class="heading-wrap">
            <h2>Evidence </h2>
            <span class="closeDiv" onClick={onClose}><i class="fas fa-times"></i></span>
        </div>
        <div class="outcome-skillList">
            {/* <div class="portfolioEvidenceFilter">
                <div class="portfolioGradeUpdate">
                    <div class="row">
                        <div class="col-lg-7 pr-1">
                            <div class="form-group">
                                <select class="form-control">
                                    <option value="1">Just Starting Out </option>
                                    <option value="2">Above and Beyond</option>
                                    <option value="3">Really Getting It!</option>
                                    <option value="4">Developing (80)</option>
                                    <option value="5">Mastery (96)</option>
                                    <option value="6">Emerging </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 pl-1 pr-1">
                            <div class="form-group">
                                <input type="number" class="form-control" />
                            </div>
                        </div>
                        <div class="col-lg-3 pl-1">
                            <div class="form-group">
                                <button type="button" class="btn btn-custom">Update </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div class="portfolioEvidenceList">
                <ul>
                {evidence?.evidences && !isEmptyArray(evidence.evidences) ? evidence.evidences.map((item, key) => (
                        <li key={key}>
                            <span className="evidenceName"><b>{item?.evidence_name}</b></span>
                            <span className="evidenceSkill">{`${item?.external_level_name} ${item.score != null ? `(${item?.score})`:''}`}</span>
                            <span className="evidencePoint">x {item.weight}</span>
                            {/* <span className="evidenceSkill">Developing (80)</span>
                            <span className="evidencePoint">x 2</span> */}
                        </li>
                    )) : <p>No Evidence found</p>}
            </ul>
                {/* <div class="button-wrapper">
                    <button type="button" class="btn btn-custom addEvidenceBtn1">Add Evidence</button>
                </div>
                <div class="d-flex w-100 justify-content-center mt-5">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="approved" name="approved" />
                        <label class="custom-control-label" for="approved">Approve this skill</label>
                    </div>
                </div> */}

            </div>
        </div>
    </div>
    )
}

export default EvidenceSideBarItems