const KEYS_TO_REPLACE = {
  TERM_ID: 'TERM_ID',
}

const API_ROUTES = {
  login: 'v2/login',
  ssologin: 'v2/sso_login',
  getUser: 'v2/user',
  getTerms: 'v1/students/school_terms',
  getClassesByTerm: `v1/students/terms/${KEYS_TO_REPLACE.TERM_ID}/class_projects`,
}

const CLASSES_PAGE = {
  PROJECTS_DROPDOWN: {
    id: 'projects-view',
    label: 'View',
    options: [
      {
        id: 'project-view-1',
        value: 'projects-learners-evidence',
        label: 'Projects - Learners - Evidence',
      },
      {
        id: 'project-view-2',
        value: 'learners-projects-evidence',
        label: 'Learners - Projects - Evidence',
      },
      {
        id: 'project-view-3',
        value: 'projects-evidences-learner',
        label: 'Projects - Evidences - Learner',
      },
    ],
  },
  TABS: [
    {
      id: 'class-tab-1',
      label: 'Projects',
      value: 'projects',
      isDisabled: false,
    },
    {
      id: 'class-tab-2',
      label: 'Portfolios',
      value: 'portfolios',
      isDisabled: false,
    },
    {
      id: 'class-tab-3',
      label: 'Reports',
      value: 'reports',
      isDisabled: false,
    },
  ],
}

export { KEYS_TO_REPLACE, API_ROUTES, CLASSES_PAGE }
