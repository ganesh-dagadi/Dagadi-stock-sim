import { createStore } from 'vuex'
import auth from './modules/auth'
import general from './modules/general'

export default createStore({
  modules: {
    auth,
    general
  }
})
