import API from '../utils/api'
import { isEmptyArray } from '../utils/utils'

const dashboard = {
  state: {
    successMessage:null,
    dashboardStats: {},
    upcomingDueEvidence: {},
    recentProjects: {},
    recentComments: {},
    classProjects: [],
    projectEvidences: [],
    evidences:[],
    portfollios:{},
    displayComments:{
      status:false,
      evidence:{}
    },
    discussionEvents :[],
    showArtifact:false,
    stepEvience:{
      isShow:false,
      name:'',
      description:'',
      pbl_resources:[]
    },
    artifactData:{
      artifact:{},
      evidenceId:''
    },
    commentData:{
      comment:{},
      evidenceId:''
    },
    skillLevels:{},
    currentProject:''
  },
  reducers: {
    setDashboardStats: (state, data) => {
      return {
        ...state,
        dashboardStats: data,
      }
    },
    setUpcomingDueEvidence: (state, data) => {
      return {
        ...state,
        upcomingDueEvidence: data,
      }
    },
    setRecentsProjects: (state, data) => {
      return {
        ...state,
        recentProjects: data,
      }
    },
    setRecentComments: (state, data) => {
      return {
        ...state,
        recentComments: data,
      }
    },

    setClassProjects: (state, data) => {
      return {
        ...state,
        classProjects: data,
      }
    },
    setProjectEvidence: (state, data, projectId,steps) => {
      return {
        ...state,
        projectEvidences: {
          ...state.projectEvidences,
            [projectId]: data
        }
      }
    },
    setEvidences :(state,data) => {
      return {
        ...state,
        evidences:data
      }
    },
    setCommentAction: (state,data) => {
      return {
        ...state,
        displayComments: data,
      }
    },
    setArtifactAction: (state,status) => {
      return {
        ...state,
        showArtifact: status,
      }
    },
    setStepDescriptionAction :(state,data) => {
      return {
        ...state,
        stepEvience:data
      }
    },
    setAddArtifactAction :(state,data) => {
      return {
        ...state,
        artifactData:data
      }
    },
    setAddCommentAction :(state,data) => {
      return {
        ...state,
        commentData:data
      }
    },
    setAddCommentAction :(state,data) => {
      return {
        ...state,
        commentData:data
      }
    },
    setSuccessMessage: (state, message) => {
      state.successMessage = message
    },
    setSkillLevelAction : (state,data) => {
      return {
        ...state,
        skillLevels:data
      }
    },
    setPorfolliodata : (state,data) => {
      return {
        ...state,
        portfollios:data
      }
    },
    setCurrentProject : (state,data) => {
      return {
        ...state,
        currentProject:data
      }
    }
  },
  effects: (dispatch) => ({
    async getDashboarStats({ termId }) {
      const endpoint = `v1/students/terms/${termId}/dashboard/stats`;
      const response = await API.getSecureRequests(endpoint);
      const data = response.data;
      dispatch.dashboard.setDashboardStats(response.data)
    },

    async getUpcomminDueEvidences({ termId }) {
      const endpoint = `v1/students/terms/${termId}/dashboard/upcoming_due_evidences`;
      const response = await API.getSecureRequests(endpoint)
      const data = response.data
      dispatch.dashboard.setUpcomingDueEvidence(data)
    },
    async getRecentProjects({ termId }) {
      const endpoint = `v1/students/terms/${termId}/dashboard/recent_projects`;
      const response = await API.getSecureRequests(endpoint)
      const data = response.data
      dispatch.dashboard.setRecentsProjects(data)
      return;
    },
    async getRecentComments({ termId }) {
      const endpoint = `v1/students/terms/${termId}/dashboard/recent_comments`;
      const response = await API.getSecureRequests(endpoint)
      const data = response.data
      dispatch.dashboard.setRecentComments(data)
    },

    async getClassProjects({ termId }) {
      const endpoint = `v1/students/terms/${termId}/class_projects`;
      const response = await API.getSecureRequests(endpoint)
      const data = response.data
      dispatch.dashboard.setClassProjects(data)
    },

    async getProjectWithEvidence({ projectId, termId, evidenceIds}) {
      let ids = evidenceIds.map(function (el, idx) {
        return 'evidence_ids[]=' + el;
      }).join('&');

      const endpoint = `v1/students/terms/${termId}/evidences?${ids}`
      const response = await API.getSecureRequests(endpoint);
      dispatch.dashboard.setProjectEvidence(response.data, projectId)
      dispatch.dashboard.setEvidences(response.data);
      return response
    },
    async commentAction(data) {
      dispatch.dashboard.setCommentAction(data);
    },
    async artifactAction(status) {
      dispatch.dashboard.setArtifactAction(status);
    },
    async showStepEvidenceDescriptionAction(data) {
      dispatch.dashboard.setStepDescriptionAction(data);
    },
    async addArtifactAction(data){
      dispatch.dashboard.setAddArtifactAction(data)
    },
    async addCommentAction(data){
      dispatch.dashboard.setAddCommentAction(data)
    },
    async startAssignment({termId,schoolClassId,evidenceId}) {
      const endpoint = `v1/students/terms/${termId}/classes/${schoolClassId}/evidences/${evidenceId}/start_resource_template`
      const response = await API.putRequest(endpoint,{});
      dispatch.dashboard.setSuccessMessage('Assignment has been started');
      return response.data
    },
    async sendAssignmentForReview({termId,schoolClassId,evidenceId}) {
      const endpoint = `v1/students/terms/${termId}/classes/${schoolClassId}/evidences/${evidenceId}/submit_resource_template`
      const response = await API.putRequest(endpoint,{});
      dispatch.dashboard.setSuccessMessage('Assignment has been send for review');
      return response.data
    },

    async skillLevelAction(data){
      dispatch.dashboard.setSkillLevelAction(data)
    },

    async getPortfollio({termId,classId}) {
      const endpoint = `v1/students/terms/${termId}/classes/${classId}/skills`
      const response = await API.getSecureRequests(endpoint);
      dispatch.dashboard.setPorfolliodata(response.data);
    },
    async currentProjectActon(projectId){
      dispatch.dashboard.setCurrentProject(projectId)
    },

  }),
}

export default dashboard
