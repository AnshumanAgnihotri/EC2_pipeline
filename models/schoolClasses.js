import API from '../utils/api'
import { API_ROUTES, KEYS_TO_REPLACE } from '../utils/constants'
import { isEmptyObject } from '../utils/utils'

const schoolClasses = {
  state: {
    schoolClasses: [],
    selectedClass: null,
    classProjects:[]
  },
  reducers: {
    setSchoolClasses: (state, data) => {
      let classes = [];
      if (data?.class_projects && Array.isArray(data?.class_projects)) {
        classes = data?.class_projects.map((classProject) => classProject.school_class)
      }
      return {
        ...state,
        schoolClasses: classes,
      }
    },
    setSelectedClass: (state, schoolClassId) => {
      const selectedClass = state.schoolClasses.find(
        (schoolClass) => schoolClass.id === schoolClassId
      )
      return {
        ...state,
        selectedClass: selectedClass || state.schoolClasses[0],
      }
    },
    setSchoolClassesProjects :(state,data) => {
      // const classProjects = data?.class_projects.map((classProject) => classProject)
      return {
        ...state,
        classProjects: data,
      }
    }
  },
  effects: (dispatch) => ({
    async getSchoolClasses({ selectedTermId, routeClassId }) {
      const response = await API.getSecureRequests(
        API_ROUTES.getClassesByTerm.replace(
          KEYS_TO_REPLACE.TERM_ID,
          selectedTermId
        )
      )
        
      console.log('response',response.data)
      if (!isEmptyObject(response.data)) {
        dispatch.schoolClasses.setSchoolClassesProjects(response.data)
        dispatch.schoolClasses.setSchoolClasses(response.data)
        dispatch.schoolClasses.setSelectedClass(routeClassId)
      }
    },
  }),
}

export default schoolClasses
