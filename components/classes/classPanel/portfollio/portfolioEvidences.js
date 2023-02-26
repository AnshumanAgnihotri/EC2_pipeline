import { Fragment } from 'react'

function PortfolioEvidences({ evidences, getRubricName }) {


  return (
    <Fragment>
      
      <ul className="scrollBar">
      {evidences && evidences.length > 0 ? (
          evidences.map((evidence,key) => {
           return (
            <li key={key}>
            <span class="evidenceName" 
            title={evidence.evidence_name}
            > {evidence.evidence_name}
            </span>
            <span class="evidenceSkill" 
            title={getRubricName(evidence.external_level_id)} 
            aria-label={getRubricName(evidence.external_level_id)}>
              {
            //   evidence.rubricRatingEnable &&
              getRubricName(evidence.external_level_id)}
              </span>
            <span class="evidencePoint" className={classes.evidenceCell}>
            {
            // evidence.numericScoreEnable &&
                      evidence.score &&
                      `(${evidence.score})`}
                    {evidence.weight && ` x${evidence.weight}`}
            </span>
          </li>
           )
          })
      ):''}
      </ul>
      </Fragment>

  )
}

export default PortfolioEvidences
