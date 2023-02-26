import API from '../utils/api'
import { API_ROUTES } from '../utils/constants'

const schoolTerms = {
  state: {
    schoolTerms: [],
    selectedTerm: null,
    isReadOnly: false,
  },
  reducers: {
    setSchoolTerms: (state, data) => {
      const schoolTerms = data?.all_terms?.sort((a, b) => b.id - a.id)
      return {
        ...state,
        schoolTerms: schoolTerms,
      }
    },
    setCurrentTerm: (state, data) => {
      return {
        ...state,
        selectedTerm: data.current_term,
        isReadOnly: false,
      }
    },
    setSelectedTerm: (state, termId) => {
      const selectedTerm = state.schoolTerms.find(
        (schoolTerm) => schoolTerm.id == termId
      )
      return {
        ...state,
        selectedTerm: selectedTerm || null,
        isReadOnly: selectedTerm.status !== 'current',
      }
    },
  },
  effects: (dispatch) => ({
    async getSchoolTerms({ routeTermId }) {
      const response = await API.getSecureRequests(API_ROUTES.getTerms)
      dispatch.schoolTerms.setSchoolTerms(response.data)

      routeTermId
        ? dispatch.schoolTerms.setSelectedTerm(routeTermId)
        : dispatch.schoolTerms.setCurrentTerm(response.data)
    },
  }),
}

export default schoolTerms
