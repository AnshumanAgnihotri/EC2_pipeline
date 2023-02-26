import axios from 'axios'

// Utils
import Auth from './auth'

class API_LEGACY {
  /**
   * Get BASE URLs
   *
   * Configuration
   */
  static get URLS() {
    const BASE_LEGACY_URL = process.env.NEXT_PUBLIC_LEGACY_APP_URL

    return {
      BASE_API: BASE_LEGACY_URL,
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
      },
    }

    return axios.post(this.URLS.BASE_API + endPoint, data, config)
  }

  /**
   * Make a PUT request.
   *
   * @param {string} endPoint
   * @param {object} data
   */
  static putRequest(endPoint, data) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return axios.put(this.URLS.BASE_API + endPoint, data, config)
  }

  /**
   * Make a PUT secure request.
   *
   * @param {string} endPoint
   */
  static putSecureRequest(endPoint, data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return axios.put(this.URLS.BASE_API + endPoint, data, config)
  }
}

export default API_LEGACY
