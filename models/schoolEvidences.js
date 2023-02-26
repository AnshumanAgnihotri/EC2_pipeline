// import API from '../utils/api'
// import { API_ROUTES, KEYS_TO_REPLACE } from '../utils/constants'

const schoolEvidences = {
  state: {
    schoolEvidences: [],
    selectedEvidence: null,
  },
  reducers: {
    setschoolEvidences: (state, data) => {
      return {
        ...state,
        schoolEvidences: data,
      }
    },
    setselectedEvidence: (state, schoolClassId) => {
      const selectedEvidence = state.schoolEvidences.find(
        (schoolClass) => schoolClass.id === schoolClassId
      )
      return {
        ...state,
        selectedEvidence: selectedEvidence || state.schoolEvidences[0],
      }
    },
  },
  effects: (dispatch) => ({
    async getSchoolEvidences({ selectedTermId, routeClassId }) {
      const response = ['All', 'Review', 'Overdiew', 'Upcoming']

      if (Array.isArray(response.data)) {
        dispatch.schoolEvidences.setschoolEvidences(response.data)
        dispatch.schoolEvidences.setselectedEvidence(routeClassId)
      }
    },
  }),
}

export default schoolEvidences
