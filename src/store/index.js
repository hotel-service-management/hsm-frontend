import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import navigation from './modules/navigation'
import booking from './modules/booking'
import privilege from './modules/privilege'
import service from './modules/service'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    booking,
    privilege,
    service,
    user,
    navigation
  }
})
