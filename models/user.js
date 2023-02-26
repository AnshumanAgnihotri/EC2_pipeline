import API from '../utils/api'
import { API_ROUTES } from '../utils/constants'

const user = {
  state: {},
  reducers: {
    setUser: (state, data) => {
      return {
        ...data,
      }
    },
  },
  effects: (dispatch) => ({
    async getUser() {
      const response = await API.getSecureRequest(API_ROUTES.getUser)

      dispatch.user.setUser(response.data)
    },
  }),
}

export default user
