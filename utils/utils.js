const isEmptyObject = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object

const isEmptyArray = (element) =>
  element && Array.isArray(element) && element.length === 0

const capitalizeFirstLetter = (string) =>
  string[0].toUpperCase() + string.slice(1)

const addProtocolURL = (url) => {
  if (!url.match(/^[a-zA-Z]+:\/\//)) return 'http://' + url

  return url
}

const formatOptions = (options, emptyValue) => {
  const newOptions = [
    {
      id: 'empty-value',
      value: emptyValue,
      label: emptyValue,
    },
  ]

  for (let i = 0; i < options.length; i++) {
    newOptions.push({
      id: options[i].id,
      value: options[i].id,
      label: options[i].name,
    })
  }

  return newOptions
}

const approveText = {
  approved: 'approved',
  unapproved: 'unapproved'
}

const projectType = {
  personal: {
    key: 'personal',
    value: "Individual"
  },
  team: {
    key: 'team',
    value: "Team"
  }

}

const chunksOfArray = (arr, n) => {
  let result = [];
  for (let i = 0; i < arr.length; i += n) {
    const chunks = arr.slice(i, i + n)
    result.push(chunks);
  }
  return result;
}

const STATUS = [
  { status: 'not_started', value: 'Not Started', enable: true, class_icon: 'radio_button_unchecked' },
  { status: 'locked', value: 'Locked', enable: true, class_icon: 'lock' },
  { status: 'assigned', value: 'Assigned', enable: false, class_icon: 'radio_button_unchecked' },
  { status: 'in_progress', value: 'In Progress', enable: true, class_icon: 'tonality' },
  { status: 'completed', value: 'Complete', enable: true, class_icon: 'check_circle' },
  { status: 'in_portfolio', value: 'In Portfolio', enable: false, class_icon: 'folder' }
];

const PROGRESS_STATUS = [
  { status: 'unlock_requested', value: 'Unlock Requested', enable: false, class_icon: 'vpn_key' },
  { status: 'review', value: 'Review Requested', enable: false, class_icon: 'find_in_page' },
  { status: 'revise', value: 'Revision Requested', enable: true, class_icon: 'create' },
  { satsus: 'unread_comments', value: 'Unread Comments', enable: false, class_icon: 'radio_button_unchecked' }
];

const stausEventWithIcon = [
  { value :'Not Started', status: 'Not Started', class_icon: 'radio_button_unchecked' },
  { value :'Completed',status: 'completed', class_icon: 'check_circle' },
  { value :'In Progress',status: 'in_progress', class_icon: 'tonality' },
  { value :'Locked',status: 'locked', class_icon: 'lock' },
  { value :'Assigned',status: 'assigned', class_icon: 'radio_button_unchecked' },
  { value :'In Portfolio',status: 'in_portfolio', class_icon: 'folder' },
  { value :'Unlock  Requested',status: 'unlock_requested', class_icon: 'vpn_key' },
  { value :'In Review',status: 'review', class_icon: 'find_in_page' },
  { value :'Revise', status: 'revise', class_icon: 'create' },

]

const allEvidenceStatus = [...STATUS, ...PROGRESS_STATUS];

const projectStatusDropdown = [
  { id: 0, value: 'draft', text: 'Draft' },
  { id: 1, value: 'active', text: 'Active' },
  { id: 2, value: 'archived', text: 'Archived' },
]

const evidenceListStatus = {
  not_started: 'not_started',
  locked: 'locked',
  assigned: 'assigned',
  in_progress: 'in_progress',
  completed: 'completed',
  in_portfolio: 'in_portfolio',
  unlock_requested: 'unlock_requested',
  review: 'review',
  in_review: 'in_review',
  revise: 'revise',
  unread_comments: 'unread_comments',
}


const getDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.getDate();
}

const getMonth = (date) => {
  const dateObj = new Date(date);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[dateObj.getMonth()]
}

const getYear  = (date) => {
  const newDate = new Date(date);
  return newDate.getFullYear();

}
const getCreatedAtDate = (date) => {
  return `${getDate(date)} ${getMonth(date)} ${getYear(date)}`;
}
const getEvidenceStatusIcon = (status) => {
  const findStatus  = stausEventWithIcon.find((item) => item.status == status);
  return findStatus?.class_icon
}

const getEvidenceStatus = (status) => {
  const findStatus  = stausEventWithIcon.find((item) => item.status == status);
  return findStatus?.value
}

const checkOverdueEvidence = (date) =>{
  var d1 = new Date();
  var d2 = new Date(date);
  if (d2 < d1) {
    return true
  } return false
}

const pblResourceHasDocument = (pblResource) => {
  let status = false;
  if (!isEmptyArray(pblResource)) {
    status =  pblResource.some((resource) => resource.document_id != null);
  }
  return status;
}

const artifactHasAttachment = (artifact) => {
  let status = false;
  if (!isEmptyObject(artifact)) {
    if (artifact.content_type != 'google_doc' && artifact.content_type != 'evidence_url') {
      status = true;
    }
  }
  return status
}

export {
  isEmptyObject,
  isEmptyArray,
  capitalizeFirstLetter,
  addProtocolURL,
  formatOptions,
  approveText,
  chunksOfArray,
  STATUS,
  allEvidenceStatus,
  PROGRESS_STATUS,
  stausEventWithIcon,
  projectType,
  projectStatusDropdown,
  getDate,
  getMonth,
  getYear,
  getCreatedAtDate,
  getEvidenceStatusIcon,
  getEvidenceStatus,
  evidenceListStatus,
  checkOverdueEvidence,
  pblResourceHasDocument,
  artifactHasAttachment

}
