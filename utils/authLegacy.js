import axios from 'axios'

class AuthLegacy {
  /**
   * Authenticates user in legacy application v3
   *
   * @param email
   * @param password
   */
  static authenticateUser(email, password) {
    const url = this.getLegacyURL('login')
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
    const data = {
      email: email,
      password: password,
      show_iframe: true
    }
    
    axios.post(url, data, config).then(function (response) {
      
      console.log(response)
          })
          .catch(function (error) {
            
            console.log(error)
          })
  }

  /**
   * Deauthenticate a user.
   * The cookie set by the legacy application is HttpOnly.
   *  so it cannot be removed from the FE, and it is necessary to use the logout request in the legacy application.
   */
  static deauthenticateUser() {
    
   // const url = this.getLegacyURL('logout')
   const url = `${this.getLegacyURL('logout')}?show_iframe=true`
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
    axios.get(url, config)
  }

  static getLegacyURL(resource = '') {
    return `${process.env.NEXT_PUBLIC_LEGACY_APP_URL}/${resource}`
  }

  static generateRandomNo(length) {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}

export default AuthLegacy
