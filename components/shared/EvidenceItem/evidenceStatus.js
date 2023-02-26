import React from 'react'
import classnames from 'classnames'

// Material UI
import Tooltip from '@material-ui/core/Tooltip'

// Icons
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import TonalityIcon from '@material-ui/icons/Tonality'
import CreateIcon from '@material-ui/icons/Create'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import FolderIcon from '@material-ui/icons/Folder'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import { ReviewRequested } from '../CustomIcons'

// Utils
import { capitalizeFirstLetter } from '../../../utils/utils'

// styles
import useStyles from './evidenceStatus.styles'

function EvidenceStatus({ status, overdue, progressStatus, locked }) {
  const classes = useStyles()
  const whichStatus = progressStatus || status

  const iconByStatus = {
    locked: <LockIcon className={classnames(classes.icon, 'silver')} />,
    assigned: (
      <RadioButtonUncheckedIcon
        className={classnames(classes.icon, 'cerulean')}
      />
    ),
    in_progress: (
      <TonalityIcon className={classnames(classes.icon, 'cerulean')} />
    ),
    completed: (
      <CheckCircleIcon className={classnames(classes.icon, 'green-haze')} />
    ),
    in_portfolio: (
      <FolderIcon className={classnames(classes.icon, 'green-haze')} />
    ),
    // Progress Status options
    unlock_requested: (
      <VpnKeyIcon className={classnames(classes.icon, 'carrot-orange')} />
    ),
    revise: <CreateIcon className={classnames(classes.icon, 'pomegranate')} />,
    review: (
      <i>
        <ReviewRequested className={classnames(classes.icon, 'pomegranate')} />
      </i>
    ),
  }

  return (
    <div className={classes.root}>
      <Tooltip
        title={capitalizeFirstLetter(whichStatus.replace('_', ' '))}
        aria-label={whichStatus}
      >
        {iconByStatus[whichStatus]}
      </Tooltip>
      {overdue && (
        <Tooltip title="Overdue" aria-label="overdue">
          <TimelapseIcon
            fontSize="default"
            className={classnames('pomegranate', classes.overdue)}
          />
        </Tooltip>
      )}
    </div>
  )
}

export default EvidenceStatus
