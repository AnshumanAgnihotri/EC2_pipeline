import API from '../utils/api'

const updateEvidence = (state, levelId, data) => {
  const evidences = state.evidences[levelId]
  const evidenceIndex = evidences.findIndex(
    (evidence) => evidence.id === data.id
  )
  evidences[evidenceIndex] = data
  return {
    ...state,
    evidences: {
      ...state.evidences,
      [levelId]: evidences,
    },
  }
}

// Removes all attributes that have as key the id of an entity (project, learner, evidence) from a dataset.
const removeEntityInformation = (dataset, entityId) => {
  const entityIdStr = entityId.toString()
  if (dataset === null) {
    return null
  }
  return Object.entries(dataset).reduce((map, [key, value]) => {
    if (!key.includes(entityIdStr)) {
      map[key] = value
    }
    return map
  }, {})
}

const classesPage = {
  state: {
    selectedTab: 'projects',
    projectsView: 'projects-learners-evidence',
    selectedEvidence: null,
    projects: null,
    learners: null,
    evidences: null,
    skills: null,
    portfolios: null,
    portfolioEvidences: null,
    onTracks: null,
    portfolioSuccessMessage: null,
    successMessage:null,
    scorePolicy: null,
    newTracingIds: [],
    deleteDiscussionEvent:null,
    updateDiscussionEvent:null,
    evidenceStats:{},
    evidenceSkiillScore: {},
    evidencecomments:{},
  },
  reducers: {
    changeSelectedTab: (state, tab) => {
      return {
        ...state,
        selectedTab: tab,
      }
    },
    changeProjectsView: (state, option) => {
      return {
        ...state,
        projectsView: option,
        projects: null,
        learners: null,
        evidences: null,
      }
    },
    setSelectedEvidence: (state, evidenceId) => {
      return {
        ...state,
        selectedEvidence: evidenceId,
      }
    },
    resetProjectInformation: (state) => {
      return {
        ...state,
        projects: null,
        learners: null,
        evidences: null,
      }
    },
    setProjects: (state, data) => {
      return {
        ...state,
        projects: data,
        learners: null,
        evidences: null,
      }
    },
    setProjectswithEvidence: (state, data) => {
      return {
        ...state,
        ProjectswithEvidence: data,
       
      }
    },
    setEvidenceSkillScoreAction: (state, data) => {
      return {
        ...state,
        evidenceSkiillScore: data,
      }
    },
    setEvidenceCommentAction: (state, data) => {
      return {
        ...state,
        evidencecomments: data,
      }
    },
    setProject: (state, data, projectId) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )
      state.projects[projectIndex].name = data.name
    },
    setLearnersByProject: (state, data, projectId) => {
      return {
        ...state,
        learners: {
          ...state.learners,
          [projectId]: data,
        },
      }
    },
    setEvidencesByProjectLearner: (state, data, params) => {
      const { projectId, learnerId } = params
      return {
        ...state,
        evidences: {
          ...state.evidences,
          [`${projectId}-${learnerId}`]: data,
        },
      }
    },
    updateEvidenceByProjectLearner: (state, data, params) => {
      const { learnerId, projectId } = params
      const levelId = `${projectId}-${learnerId}`
      return updateEvidence(state, levelId, data)
    },
    setLearners: (state, data) => {
      return {
        ...state,
        learners: data,
        projects: null,
        evidences: null,
      }
    },
    setProjectsByLearner: (state, data, learnerId) => {
      return {
        ...state,
        projects: {
          ...state.projects,
          [learnerId]: data,
        },
      }
    },
    setEvidenceDiscussionEvent: (state, data) => {
      return {
        ...state,
        evidencediscussiondata: data,
      }
    },
    setFeedbackDetailsByevidenceID: (state, data) => {
      return {
        ...state,
        evidenceFeedbackDetal: data,
      }
    },
    setEvidencesByLearnerProject: (state, data, params) => {
      const { learnerId, projectId } = params
      return {
        ...state,
        evidences: {
          ...state.evidences,
          [`${learnerId}-${projectId}`]: data,
        },
      }
    },
    updateEvidenceByLearnerProject: (state, data, params) => {
      const { learnerId, projectId } = params
      const levelId = `${learnerId}-${projectId}`
      return updateEvidence(state, levelId, data)
    },
    setEvidencesByProject: (state, data, projectId) => {
      return {
        ...state,
        learners: {
          ...state.learners,
          [projectId]: data,
        },
      }
    },
    setCommentsStatus: (state, data) => {
      return {
        ...state,
        commentsstatus: data,
      }
    },
    setDeleteCommentStatus: (state, data) => {
      return {
        ...state,
        deleteDiscussionEvent: data,
      }
    },
    setUpdateCommentStatus: (state, data) => {
      return {
        ...state,
        updateDiscussionEvent: data,
      }
    },
    setEvidenceData: (state, data) => {
      return {
        ...state,
        evidenceData: data,
      }
    },

    setChangeEvidenceStatusStatus: (state, data) => {
      return {
        ...state,
        changeEvidenceStatus: data,
      }
    },
    setAddEvidenceToPortfollio: (state, data) => {
      return {
        ...state,
        addToPortfolios: data,
      }
    },

    setChangeEvidenceProgressStatus: (state, data) => {
      return {
        ...state,
        changeEvidenceProgressStatus: data,
      }
    },

    setDeleteArtifactEvidence: (state, data) => {
      return {
        ...state,
        deleteArtifaceEvidenceStatus: data,
      }
    },
    setLearnersByProjectEvidence: (state, data, params) => {
      const { projectId, evidenceId } = params
      return {
        ...state,
        evidences: {
          ...state.evidences,
          [`${projectId}-${evidenceId}`]: data,
        },
      }
    },
    removeProjectInformation: (state, projectId) => {
      const learners = removeEntityInformation(state.learners, projectId)
      const evidences = removeEntityInformation(state.evidences, projectId)
      return {
        ...state,
        learners: learners,
        evidences: evidences,
      }
    },
    setEvidenceScore: (state, params) => {
      const { evidenceId, externalSkillId, levelIdentifier, data } = params
      const itemToUpdate = state.evidences[levelIdentifier]
        .find((evidence) => evidence.id === evidenceId)
        .score.find((element) => element.externalSkillId === externalSkillId)

      itemToUpdate.levelId = data.external_level_id
      itemToUpdate.score = data.score
      itemToUpdate.weight = data.weight
    },
    setSkills: (state, data) => {
      return {
        ...state,
        skills: data,
      }
    },
    setPortfolios: (state, data) => {
      return {
        ...state,
        portfolios: data,
      }
    },
    setEvidencebyTermID: (state, data) => {
      return {
        ...state,
        evidencesdetails: data,
      }
    },

    setEvidencePaginationInfo: (state, meta) => {
      return {
        ...state,
        evidencePaginationInfo: meta,
      }
    },
    setEvidenStats: (state, data) => {
      return {
        ...state,
        evidenceStats: data,
      }
    },
    setOnTracks: (state, data) => {
      return {
        ...state,
        onTracks: data,
      }
      /*
      if (data.action === "LOAD") {
        return {
          ...state,
          onTracks: data.data
        }
      } else if (data.action === "NEW") {
        return {
          ...state,
          onTracks: [
            ...state.onTracks,
            data.data
          ]
        }
      } else {
        return state
      }
      */
    },
    
    setEvidence: (state, params) => {
      const { evidenceData, levelIdentifier } = params
      const evidenceIndex = state.evidences[levelIdentifier].findIndex(
        (evidence) => evidence.id === evidenceData.id
      )
      state.evidences[levelIdentifier][evidenceIndex] = evidenceData
    },
    setPortfolioEvidences: (state, data) => {
      state.portfolioEvidences = data
    },
    setPortfolioSuccessMessage: (state, message) => {
      state.portfolioSuccessMessage = message
    },
    setSuccessMessage: (state, message) => {
      state.successMessage = message
    },
    updatePortfolioStatus: (state, params) => {
      const { data, portfolioKey } = params
      state.portfolios[portfolioKey].approved = data.rating_type === 'approved'
    },
    updatePortfolioRatings: (state, params) => {
      const { data, skillLevels, portfolioKey } = params
      state.portfolios[portfolioKey].external_level_id = data.external_level_id
      state.portfolios[portfolioKey].score = data.score
      state.portfolios[portfolioKey].level_name =
        skillLevels.find((item) => item.id === data.external_level_id)?.name ||
        ''
    },
    setScorePolicy: (state, data) => {
      state.scorePolicy = data
    },
    updateSinglePortfolio: (state, params) => {
      const { data, key } = params
      state.portfolios[key] = data
    },
    setNewTracingId: (state, params) => {
      state.newTracingIds[params.studentId] = params.tracingId
    },
  },
  effects: (dispatch) => ({
    // by Satan

    async getEvidencebyTermID({ selectedTermId, params }) {
      let queryParams  = [];
      Object.keys(params)
      .filter(function (key, i) {
        if (!Array.isArray(params[key]) && params[key]) {
          queryParams.push(`${key}=`+  params[key]);
        }
        if (Array.isArray(params[key]) && params[key].length > 0) {
          queryParams.push(`${key}[]=`+  params[key])
        }
      })
      queryParams = queryParams.join('&');
      const endpoint = `v1/students/terms/${selectedTermId}/evidences?${queryParams}`
      const response = await API.getSecureRequests(endpoint, params)
      dispatch.classesPage.setEvidencebyTermID(response.data.evidences.data)
      dispatch.classesPage.setEvidencePaginationInfo(response.data.evidences.meta)
    },

    async updateEvidenceScoreByID({ evidenceId, params }) {
      const endpoint = `v2/evidences/${evidenceId}/evidence_scores`
      const response = await API.postSecureRequest(endpoint, params)
      const data = response.data
      // dispatch.classesPage.setEvidenceScore({
      //   external_skill_id: params.external_skill_id,
      //   external_level_id: params.external_level_id,
      //   score: null,
      //   weight: 1,
      //   data: data,
      // })
      dispatch.classesPage.setSuccessMessage(response.data.message);
    },
    async getTermStats(termId) {
      const endpoint = `v1/teachers/terms/${termId}/evidences/stats`
      const response = await API.getSecureRequests(endpoint)
      dispatch.classesPage.setEvidenStats(response.data)
    },

    async getEvidenceDiscussionEvent({ params }) {
      const endpoint = `v2/evidences/${params.evidenceid}/discussion_events`
      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setEvidenceDiscussionEvent(response.data.data)
      return response.data.data
    },

    async deleteEvidenceDiscussionEventById({termId,commentId}) {
      const endpoint = `v1/students/terms/${termId}/discussion_comments/${commentId}`
      const response = await API.deleteRequest(endpoint)
      dispatch.classesPage.setDeleteCommentStatus(response.data);
      dispatch.classesPage.setSuccessMessage(response.data.message);
      return response.data;
    },

    async updateEvidenceDiscussionEventById({termId,commentId,params}) {
      const endpoint = `v1/students/terms/${termId}/discussion_comments/${commentId}`
      const response = await API.putRequest(endpoint,params)
      dispatch.classesPage.setUpdateCommentStatus(response.data);
      dispatch.classesPage.setSuccessMessage(response.data.message);
      return response.data
    },

     /* to do with body */
     
    async getEvindenceData({school_term_ids,school_class_ids,evidenceIds}) {
      let ids = evidenceIds.map(function(el, idx) {
        return 'evidence_ids[]=' + el;
       }).join('&');

      const endpoint = `v1/teachers/evidences?${ids}&school_term_ids[]=${school_term_ids}&school_class_ids[]=${school_class_ids}&include_evidence_scores=true&by_evidence_ids=true`
      const response = await API.getLearnersDetailsByPEvidenceID(endpoint)
      dispatch.classesPage.setEvidenceData(response.data)
      return response.data
    },

    async addCommentbyEvidenceID({ termId, params }) {
      const endpoint = `v1/students/terms/${termId}/discussion_comments`
      const response = await API.postRequestNew(endpoint, params)
      const data = response
      dispatch.classesPage.setCommentsStatus({
        data: data,
      })
      dispatch.classesPage.setSuccessMessage(response.data.message);
      return response.data
    },

    async addEvidenceToPortFollio({evidenceId,params}) {
      console.log('addEvidenceToPortFollio',params)
      const endpoint = `v2/evidences/${evidenceId}/add_to_portfolios`
      const response = await API.putSecureRequest(endpoint, params)
      const data = response
      dispatch.classesPage.setAddEvidenceToPortfollio({
        data: data,
      })
      dispatch.classesPage.setSuccessMessage(response.data.message);
      return response.data;
    },

    async changeEvidenceStatus(params) {
      const endpoint = `v2/evidences/change_status`
      const response = await API.putSecureRequest(endpoint, params)
      const data = response
      dispatch.classesPage.setChangeEvidenceStatusStatus({
        data: data,
      })

      dispatch.classesPage.setSuccessMessage(response.data.message);
    },

    async changeEvidenceProgressStatus({evidenceId,params}) {
      console.log('parameters',params)
      const endpoint = `v2/evidences/${evidenceId}/change_progress_status`
      const response = await API.putSecureRequest(endpoint, params)
      const data = response;
      dispatch.classesPage.setChangeEvidenceProgressStatus({
        data: data,
      })
      dispatch.classesPage.setSuccessMessage(response.data.message);
    },

    // async changeEvidenceStatus({ params }) {
    //   const endpoint = `v2/evidences/change_status`

    //   const response = await API.postSecureRequest(endpoint, params)
    //   const data = response

    //   dispatch.classesPage.setChangeEvidenceStatusStatus({
    //     data: data,
    //   })
    // },


    async getFeedbackDetailsByevidenceID({ evidenceid }) {
      const endpoint = `v2/evidences/${evidenceid}`

      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setFeedbackDetailsByevidenceID(response.data)
      const data = response.data
      return data;
    },

    async addArtifact({ termId,evidenceid, formvalue }) {
      const endpoint =  `v1/students/terms/${termId}/evidences/${evidenceid}/artifacts`
      const response = await API.postRequestNew(endpoint, formvalue)
      const data = response

      dispatch.classesPage.setCommentsStatus({
        data: data,
      })
      dispatch.classesPage.setSuccessMessage(response.data.message);
      return response.data;
    },
    

    async deletAttachArtifactEvidence({ termId,evidenceid }) {
      const endpoint = `v1/students/terms/${termId}/evidences/${evidenceid}/artifacts`
      const response = await API.deleteRequest(endpoint)
      const data = response
      dispatch.classesPage.setDeleteArtifactEvidence({
        data: data,
      })
      dispatch.classesPage.setSuccessMessage(response.data.message);
      return response.data;
    },
    // async getEvidenceByTermID({ selectedTermId }) {
    //   const endpoint = `v2/teachers/terms/${selectedTermId}/evidences`

    //   const response = await API.postSecureRequest(endpoint, params)
    // const data = response.data

    // },
    // end
    async getProjects({ selectedTermId, classId }) {
      const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/projects`
      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setProjects(response.data.projects)
    },

    async getProjectswithEvidence({ selectedTermId, classId,createdBy,projectName,learnerName }) {
      const endpoint = `v1/teachers/project_templates?school_term_id=${selectedTermId}&school_class_id=${classId}&with_evidence_count=true&with_students=true&with_evidences=true&created_by=${createdBy}&project_name=${projectName}&student_name=${learnerName}`
      const response = await API.getSecureRequests(endpoint)
      dispatch.classesPage.setProjectswithEvidence(response.data.project_templates)
      return response.data.project_templates
    
  },
    async updateProjectTemplate({
      projectTemplateId,
      classId,
      selectedTermId,
    }) {
      const endpoint = `v2/project_templates/${projectTemplateId}`
      const response = await API.getSecureRequest(endpoint)

      // If the project template does not exist, it is necessary to reload the information of all projects.
      // because when deleting a project the user has access to the project library and could have changed another project.
      if (response.data.success === false) {
        await dispatch.classesPage.resetProjectInformation()
        await dispatch.classesPage.getProjects({
          selectedTermId: selectedTermId,
          classId: classId,
        })
      } else {
        dispatch.classesPage.setProject(response.data.data, projectTemplateId)
      }
    },
    async getLearnersByProject({ classId, projectId }) {
      const endpoint = `v2/classes/${classId}/projects/${projectId}/students`

      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setLearnersByProject(response.data.data, projectId)
    },

    async getEvidencesByProjectLearner({ projectId, learnerId }) {
      const endpoint = `v2/projects/${projectId}/students/${learnerId}/evidences`

      const response = await API.getSecureRequest(endpoint)

      dispatch.classesPage.setEvidencesByProjectLearner(response.data.data, {
        learnerId,
        projectId,
      })
    },
    async getLearners({ selectedTermId, classId }) {
      const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/students`

      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setLearners(response.data)
    },
    async getProjectsByLearner({ selectedTermId, classId, learnerId }) {
      const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/students/${learnerId}/projects`

      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setProjectsByLearner(response.data.data, learnerId)
    },
    async getEvidencesByLearnerProject({ learnerId, projectId }) {
      const endpoint = `v2/students/${learnerId}/projects/${projectId}/evidences`

      const response = await API.getSecureRequest(endpoint)

      dispatch.classesPage.setEvidencesByLearnerProject(response.data.data, {
        learnerId,
        projectId,
      })
    },
    async getEvidencesByProject({ classId, projectId }) {
      const endpoint = `v2/classes/${classId}/projects/${projectId}/evidences`

      const response = await API.getSecureRequest(endpoint)
      dispatch.classesPage.setEvidencesByProject(response.data.data, projectId)
    },
    async getLearnersByProjectEvidence({ classId, projectId, evidenceId }) {
      const endpoint = `v2/classes/${classId}/projects/${projectId}/evidences/${evidenceId}/studentsEvidence`

      const response = await API.getSecureRequest(endpoint)

      dispatch.classesPage.setLearnersByProjectEvidence(response.data.data, {
        evidenceId,
        projectId,
      })
    },
    async updateEvidenceScore({ evidenceId, levelIdentifier, params }) {
      const endpoint = `v2/evidencescores/${evidenceId}`

      const response = await API.postSecureRequest(endpoint, params)
      const data = response.data

      dispatch.classesPage.setEvidenceScore({
        evidenceId: evidenceId,
        levelIdentifier: levelIdentifier,
        externalSkillId: params.externalSkillId,
        data: data,
      })
    },
    async getSkills({ selectedTermId, classId }) {
      const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/skills`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.setSkills(data)
    },
    async getPortfolios({ selectedTermId, classId }) {
      const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/portfolios`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.setPortfolios(data)
    },
    async getOnTracks({ selectedTermId, classId }) {
      const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/progress`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.setOnTracks(data)
    },
    async getEvidenceInfo({ evidenceId, levelIdentifier }) {
      const endpoint = `v2/evidenceinfo/${evidenceId}`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.setEvidence({
        evidenceData: data,
        levelIdentifier: levelIdentifier,
      })
    },
    async getPortfolioEvidences({ portfolioId, classId }) {
      const endpoint = `v2/portfolios/${portfolioId}/classes/${classId}/evidences`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.setPortfolioEvidences(data)
    },

    async updatePortfolio({
      classId,
      portfolioId,
      changeStatus,
      skillLevels,
      params,
      portfolioKey,
      parentData,
    }) {
      const endpoint = `v2/classes/${classId}/portfolio/${portfolioId}/rating`
      const response = await API.postSecureRequest(endpoint, params)
      const data = response.data.data

      if (changeStatus) {
        dispatch.classesPage.updatePortfolioStatus({
          data: data,
          portfolioKey: portfolioKey,
        })
      } else {
        dispatch.classesPage.updatePortfolioRatings({
          data: data,
          portfolioKey: portfolioKey,
          skillLevels: skillLevels,
        })

        parentData &&
          parentData.id &&
          dispatch.classesPage.getSinglePortfolio({
            classId: classId,
            portfolioId: parentData.id,
            portfolioKey: parentData.key,
          })
      }
    },

    async approvePortFolio({
      classId,
      portfolioId,
      params,
    }) {
      const endpoint = `v2/classes/${classId}/portfolio/${portfolioId}/rating`
      const response = await API.postSecureRequest(endpoint, params)
      const data = response.data.data;
      dispatch.classesPage.setSuccessMessage(response.data.message);
    },

    async updateTracingComment({ commentId, params }) {
      const endpoint = `v2/comments/${commentId}/update_comment`
      const response = await API.postSecureRequest(endpoint, params)
      const data = response.data
      if (commentId === 0) {
        // New Tracing
        dispatch.classesPage.setNewTracingId({
          tracingId: data.id,
          studentId: data.student_id,
        })
      }
    },
    async updateTracingOnTrack({ commentId, params }) {
      const endpoint = `v2/comments/${commentId}/update_ontrack`
      const response = await API.postSecureRequest(endpoint, params)
      const data = response.data
      if (commentId === 0) {
        // New Tracing
        dispatch.classesPage.setNewTracingId({
          tracingId: data.id,
          studentId: data.student_id,
        })
      }
    },
    async getScorePolicy({ schoolId, skillId }) {
      const endpoint = `v2/schools/${schoolId}/skills/${skillId}/score_policy`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.setScorePolicy(data)
    },
    async getSinglePortfolio({ classId, portfolioId, portfolioKey }) {
      const endpoint = `v2/classes/${classId}/portfolio/${portfolioId}`

      const response = await API.getSecureRequest(endpoint)
      const data = response.data.data

      dispatch.classesPage.updateSinglePortfolio({
        data: data,
        key: portfolioKey,
      })
    },

    async evidenceSkillScoreAction(data) {
      dispatch.classesPage.setEvidenceSkillScoreAction(data)
    },
    async evidenceCommentAction(data) {
      dispatch.classesPage.setEvidenceCommentAction(data);
    }
  }),
}

export default classesPage
