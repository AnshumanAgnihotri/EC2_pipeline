import axios from 'axios'

// Utils
import Auth from './auth'

class API {
  /**
   * Get BASE URLs
   *
   * Configuration
   */
  static get URLS() {
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL

    return {
      BASE_API: BASE_API_URL,
    }
  }
  static get BASEURLS() {
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URLS

    return {
      BASE_API: BASE_API_URL,
    }
  }
  /**
   * Make a GET request.
   *
   * @param {string} endPoint
   */
  static getRequest(endPoint) {
    return axios.get(this.URLS.BASE_API + endPoint)
  }

  /**
   * Make a POST request.
   *
   * @param {string} endPoint
   * @param {object} data
   */
  static postRequest(endPoint, data) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.post(this.URLS.BASE_API + endPoint, data, config)

    
  }

  static postRequestNew(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.post(this.BASEURLS.BASE_API + endPoint, data, config)
  }
  // static postRequestSso(endPoint, data) {

  //   const config = {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
  //     },
  //   }
  //   debugger
  //   return axios.post(this.URLS.BASE_API + endPoint, data)
  //   debugger
  // }
  /**
   * Make a PUT request.
   *
   * @param {string} endPoint
   */
  static putRequest(endPoint) {
    return axios.put(this.URLS.BASE_API + endPoint)
  }

  /**
   * Make a GET secure request.
   *
   * @param {string} endPoint
   */
  static getSecureRequest(endPoint) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.get(this.URLS.BASE_API + endPoint, config)
  }
  static getSecureRequests(endPoint) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.get(this.BASEURLS.BASE_API + endPoint, config)
  }
  static getLearnersByProjectID({ classId, projectId }) {
    const endpoint = `v2/classes/${classId}/projects/${projectId}/students`
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.get(this.URLS.BASE_API + endpoint, config)
  }

  static getProjectLearnerEvidenceBySearch({ selectedTermId, data }) {
    const endpoint = `v2/teachers/terms/${selectedTermId}/evidences/search.json`

    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.post(this.URLS.BASE_API + endpoint, data, config)
  }

  static getEvidencesByProjectLearner({ projectId, learnerId }) {
    const endpoint = `v2/projects/${projectId}/students/${learnerId}/evidences`
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.get(this.URLS.BASE_API + endpoint, config)
  }

  static getFeedbackDetailsByevidenceID({ evidenceid }) {
    const endpoint = `v2/evidences/${evidenceid}`
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.get(this.URLS.BASE_API + endpoint, config)
  }

  static getEvidencesByProject({ classId, projectId }) {
    const endpoint = `v2/classes/${classId}/projects/${projectId}/evidences`
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }
    return axios.get(this.URLS.BASE_API + endpoint, config)
  }

  static getLearnersByProjectEvidence({ classId, projectId, evidenceId }) {
    const endpoint = `v2/classes/${classId}/projects/${projectId}/evidences/${evidenceId}/studentsEvidence`

    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }
    return axios.get(this.URLS.BASE_API + endpoint, config)
  }
  static getLearnersDetailsByPEvidenceID(endpoint) {
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }
    
    return axios.get(this.BASEURLS.BASE_API + endpoint, config)
    
  }
  // Learners> project > Evidence
  static getProjectsByLearner({ selectedTermId, classId, learnerId }) {
    const endpoint = `v2/terms/${selectedTermId}/classes/${classId}/students/${learnerId}/projects`

    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }
    return axios.get(this.URLS.BASE_API + endpoint, config)
  }
  static getEvidenceDiscussionEvent({ evidenceid }) {
    const endpoint = `v2/evidences/${evidenceid}/discussion_events`

    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }
    return axios.get(this.URLS.BASE_API + endpoint, config)
  }
  /**
   * Make a POST secure request.
   *
   * @param {string} endPoint
   */
  static postSecureRequest(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.post(this.URLS.BASE_API + endPoint, data, config)
  }

  static putSecureRequest(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.put(this.URLS.BASE_API + endPoint, data, config)
  }

  /**
   * Make a POST secure request.
   *
   * @param {string} endPoint
   */
  static postSecureRequest1(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.post(this.URLS.BASE_API + endPoint, data, config)
  }

  static deleteRequest(endPoint) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.delete(this.BASEURLS.BASE_API + endPoint, config)
  }

  static putRequest(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.put(this.BASEURLS.BASE_API + endPoint, data, config)
  }
  static postRequestNew(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.post(this.BASEURLS.BASE_API + endPoint, data, config)
  }

  static deleteRequests(endPoint) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'X-Request-Origin': process.env.NEXT_PUBLIC_CLIENT_APP_URL,
      },
    }

    return axios.delete(this.URLS.BASE_API + endPoint, config)
  }
}

export default API
