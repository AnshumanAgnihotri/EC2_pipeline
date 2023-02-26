import React from "react";
import { allEvidenceStatus } from "../../../utils/utils";

const evidenceStatus = React.memo((props) => {
  const { evidenceStatusEvent, evidecne_class_status, liStatusEvents, evidenceStatus, evidenceId } = props;

  return (
    <div className="evidence-status">
      <label>Update Status</label>
      <div className="custom-select-div spanDropdown" id="evidenceStatus" onClick={(e) => evidenceStatusEvent(e, props?.index)}>
        <span className={`material-icons ${evidecne_class_status?.status}`} key={props?.index.toString()}>{evidecne_class_status?.class_icon}</span>
        {evidecne_class_status?.value}
      </div>
      <div
        className="custom-select-list update-status"
        style={{
          display: evidenceStatus !== '' && (props?.selectedeEvidence === props?.index) ? 'block' : 'none',
        }}
      >
        <ul onClick={(e) => liStatusEvents(e, evidenceId)}>
          {allEvidenceStatus.filter((status) => status.enable === true).map((statusItem, index) => (
            <li key={`s1-${index}`} data-status={statusItem.status}>
              <span className={`material-icons ${statusItem.status}`}>{statusItem.class_icon}</span>
              {statusItem.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default evidenceStatus