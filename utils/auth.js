import Cookies from 'js-cookie'

class Auth {
  /**
   * Authenticate a user. Save a token string in the cookies
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    // expiration time in 3 hours
    const expirationTime = new Date()
    expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 60 * 1000)

    // this cookie will expire in one day
    Cookies.set('api-token', token, {
      expires: expirationTime,
      domain: `.${this.getDomainName()}`,
    })
  }

  /**
   * Check if a user is authenticated - check if a token exists in the cookies
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return !!Cookies.get('api-token')
  }

  /**
   * Deauthenticate a user. Remove a token from the cookies.
   *
   */
  static deauthenticateUser() {
    
    Cookies.remove('api-token', { domain: this.getDomainName() })
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    return Cookies.get('api-token')
  }

  /**
   * Returns the domain of the page without taking into account the subdomains.
   * @return {string}
   */
  static getDomainName() {
    return window.location.hostname.split('.').slice(-2).join('.')
  }
  /* Generate random number according to length pass as parameter */

  static generateRandomNo(length) {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  /**
   * Authenticate a user. Save a token string in the cookies
   *
   * @param {string} token
   */
  static authenticateEdlinkUser(token) {
    // expiration time in 3 hours
    const expirationTime = new Date()
    expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 60 * 1000)

    // this cookie will expire in one day
    Cookies.set('api-edlink-token', token, {
      expires: expirationTime,
      domain: `.${this.getDomainName()}`,
    })
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getEdlinkToken() {
    return Cookies.get('api-edlink-token')
  }
}

export default Auth
