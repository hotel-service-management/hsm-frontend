import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import navigation from './modules/navigation'
import booking from './modules/booking'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    booking,
    user,
    navigation
  }
})
