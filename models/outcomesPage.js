import API from '../utils/api'

const outcomesPage = {
  state: {
    studentClassGrades: {},
    studentUpdateClass:{},
    successMessage:null,
  },
  reducers: {
    setStudentClassGrades: (state, data) => {
      return {
        ...state,
        studentClassGrades: data,
      }
    },
    setUpdateStudentClassStatus: (state, data) => {
      return {
        ...state,
        studentUpdateClass: data,
      }
    },
    setSuccessMessage: (state, message) => {
      state.successMessage = message
    },
  },
  effects: (dispatch) => ({
    async getStudentclassgrades({termId,classId}) {
      const endpoint = `v1/teachers/classes/${classId}/terms/${termId}/student_class_grades`;
      const response = await API.getSecureRequests(endpoint)
      dispatch.outcomesPage.setStudentClassGrades(response.data)
    },

    async updateStudentClass({termId,classId,studentId,params}) {
      const endpoint = `v1/teachers/classes/${classId}/terms/${termId}/student_class_grades/${studentId}`;
      const response = await API.putRequest(endpoint,params)
      dispatch.outcomesPage.setUpdateStudentClassStatus(response.data)
      return response.data
    }
  }),
}

export default outcomesPage
