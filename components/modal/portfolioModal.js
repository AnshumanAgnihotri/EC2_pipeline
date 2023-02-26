import React,{useState} from 'react'
// import { useDispatch } from 'react-redux'
// import GoogleApi from '../../utils/google_api.js'
// import axios from 'axios'
import Modal from "react-bootstrap/Modal";
import { useDispatch } from 'react-redux'

export default function PortfolioModal({
	open,
	children,
	onClose1,
	add_to_portfolio,
	added_skills,
	schoolSkills,
}) {
	console.log('added_skills',added_skills);
	const dispatch = useDispatch();
	const [skillIDS,setSkillIDS] = useState([]);
	const skillHandler = (e) => {
		{e.target.checked 
			? setSkillIDS((skillIDS) => [...new Set(skillIDS),e.target.value])
			: setSkillIDS(skillIDS.filter((sId) => sId !== e.target.value));
		}
	}
	const addToPortFolioHandler = () => {
		const params = {
			params:{
				skill_ids:skillIDS,
			    students_ids:[add_to_portfolio.studentId],
			    school_class_id:add_to_portfolio.classId
			},
			evidenceId:add_to_portfolio.evidenceId
		}
		console.log('params',params)
		dispatch.classesPage.addEvidenceToPortFollio(params)
		.then((response) => {
			onClose1();
		}).catch((error) => {
			console.log('error',error);
		})

		console.log('params in portfolio',params);
	}
	console.log('schoolSkills', schoolSkills)
	if (!open) return null


	console.log('skill ids',skillIDS);
	return (
		<>
			<div className="overlay_style"></div>

			<Modal
				show={open ? true : false}
				dialogClassName="feedback-modal modal-xl"
			>

				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">Portfollio</h4>
						<button type="button" className="close" onClick={onClose1}>
							&times;
						</button>
					</div>
					<div className="modal-body feedback-body">
						<div className="feedback-wrapper">
							<div className="row">
								<div className="col-lg-12">
									<div className="portfollos-box">
										<div className="portfollos-head">
											<h3 className="heading">Scoring Evidence and Adding to Portfollos</h3>
											<button type="button" className="btn btn-button" onClick={() => addToPortFolioHandler()}>Add to Portfollos</button>
										</div>
										<div className="portfollos-note">
											<p>The skills tagged to this evidence are listed in the table below.</p>
											<p>From the table, you can score the evidence and add completed evidence to portfolios.</p>
											<p>The evidence has been marked complete, you or your learners can add it to any tagged skill Portfolio(s) by checking the appropriate boxes and clicking "Add".</p>
											<p>Rubric rating has been enabled, use the pencil icon to enter or change a rating. Click to save.</p>
										</div>
										<div className="portfollos-list">
											<div className="portfollos-search filter-wrap">
												<div className="row d-flex justify-content-end">
													<div className="col-lg-3">

														<div className="input-group">
															<div className="input-group-prepend">
																<span className="input-group-text"><i className="fa fa-search"></i></span>
															</div>
															<input type="text" className="form-control" placeholder="Search for a skill"></input>
														</div>

													</div>
												</div>
											</div>
											<div className="table-responsive">
												<table className="table custom-table">
													<thead>
														<tr>
															<th>In Portfolio</th>
															<th>Skill</th>
															{/* <th>Rate Evidence</th> */}
															{/* <th>Weight</th> */}
														</tr>
													</thead>
													<tbody>
														{schoolSkills && schoolSkills.length > 0 && schoolSkills.map((skill, index) => (
															<tr key={index}>
																<td>
																	{added_skills.includes(skill.id) ?
																		<span className="portfolioChecked"><i className="far fa-check-circle"></i></span>
																		: <div className="custom-control custom-checkbox">
																		<input type="checkbox" className="custom-control-input" value={skill.id} onChange={(e) => skillHandler(e)} id={`checkbox-${index}`} />
																		<label className="custom-control-label" htmlFor={`checkbox-${index}`}></label>
																	</div>
																	}
																</td>
																<td>{skill.description}</td>
																{/* <td>
																<div className="evidence-status">
																	<div className="custom-select-div spanDropdown" id="evidenceStatus"><span className="material-icons">radio_button_unchecked</span>Not Started</div>
																	<div className="custom-select-list update-status" style={{ display: "none" }}>
																		<ul>
																			<li><span className="material-icons">radio_button_unchecked</span>Not Started</li>
																			<li><span className="material-icons">lock</span>Locked </li>
																			<li><span className="material-icons">tonality</span>In progress</li>
																			<li><span className="material-icons">check_circle</span>Complete</li>
																			<li><span className="material-icons">radio_button_checked</span>Review Requested</li>
																			<li><span className="material-icons">vpn_key</span>Unlock Requested </li>
																			<li><span className="material-icons">create</span>Revision Requested </li>
																			<li><span className="material-icons">delete</span>Remove request</li>
																		</ul>
																	</div>
																</div>
															</td> */}
																{/* <td>x1</td> */}
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	)
}


