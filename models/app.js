import API_LEGACY from '../utils/apiLegacy'

const app = {
  state: {
    sideBarOpen: false,
    helpBarOpen: false,
    evidencePaneOpen: false,
    resetPasswordFeedback: {
      type: 'info',
      message: '',
    },
  },
  reducers: {
    changeSideBarOpen: (state, open) => {
      return {
        ...state,
        sideBarOpen: open,
      }
    },
    changeHelpBarOpen: (state, open) => {
      return {
        ...state,
        helpBarOpen: open,
      }
    },
    changeEvidencePaneOpen: (state, open) => {
      return {
        ...state,
        evidencePaneOpen: open,
      }
    },
    setResetPasswordFeedback: (state, values) => {
      return {
        ...state,
        resetPasswordFeedback: values,
      }
    },
  },
  effects: (dispatch) => ({
    async getResetPasswordToken(params) {
      const endpoint = `account/password/recover`
      return await API_LEGACY.postRequest(endpoint, params)
    },
    async verifyResetToken(token) {
      const endpoint = `account/password/recovery_token?token=${token}`
      return await API_LEGACY.getRequest(endpoint)
    },
    async resetPassword({ isAuthenticated, params }) {
      const endpoint = `account/password/edit`
      if (isAuthenticated) {
        return await API_LEGACY.putSecureRequest(endpoint, params)
      }
      return await API_LEGACY.putRequest(endpoint, params)
    },
  }),
}

export default app
