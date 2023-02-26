import API from '../utils/api'

const combinedPortfollioPage = {
  state: {
    combinedPortfollio: {},
    showEvidence:{
      isShowEvidence:false,
      evidence:[]
    },
    showComment:false
  },
  reducers: {
    setCombinedPortfollio: (state, data) => {
      return {
        ...state,
        combinedPortfollio: data,
      }
    },
    setShowEvidence: (state,data) => {
      return {
        ...state,
        showEvidence: data,
      }
    },
    setShowComment: (state,status) => {
      return {
        ...state,
        showComment: status,
      }
    },
  },
  

  effects: (dispatch) => ({
    async getCombinedPortfollio() {
      const endpoint = `v1/students/combined_portfolios`;
      const response = await API.getSecureRequests(endpoint)
      dispatch.combinedPortfollioPage.setCombinedPortfollio(response.data)
    },
    async evidenceAction(data) {
      dispatch.combinedPortfollioPage.setShowEvidence(data);
    },
    async showCommentAction(status) {
      dispatch.combinedPortfollioPage.setShowComment(status);
    }
  }),

 


}

export default combinedPortfollioPage
