import API from '../utils/api'

const projectLibraryPage = {
  state: {
    projectlibraries: [],
  },
  reducers: {
    setProjectLibraries: (state, data) => {
      return {
        ...state,
        projectlibraries: data,
      }
    },
  },
  effects: (dispatch) => ({
    async getProjectLibraries(params) {
      let quertParams = Object.keys(params).filter((k) =>params[k] != '').map(function(key) {
        return `${key}=` + params[key];
       }).join('&');

      const endpoint = `v1/teachers/project_templates?${quertParams}`
      const response = await API.getSecureRequests(endpoint)
      dispatch.projectLibraryPage.setProjectLibraries(response.data)
    },
  }),
}

export default projectLibraryPage
