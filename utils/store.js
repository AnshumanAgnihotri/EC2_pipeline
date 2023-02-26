import { init } from '@rematch/core'

// Models
import * as models from '../models'

// Plugins
import loadingPlugin from '@rematch/loading'
import immerPlugin from '@rematch/immer'

const store = init({
  models,
  plugins: [loadingPlugin(), immerPlugin()],
  redux: {
    rootReducers: {
      RESET_APP: () => undefined,
    },
  },
})

export default store
