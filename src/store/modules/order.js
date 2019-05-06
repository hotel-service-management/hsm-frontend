// import axios from 'axios'
import authInstance from '@/util/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    order: {}
  },
  mutations: {
    setOrder (state, payload) {
      state.order = payload
    }
  },
  actions: {
    async getOrder ({ commit }, id) {
      let order = await authInstance.get(`/order/${id}/`).then(r => r.data)

      commit('setOrder', order)
    }
  }
}
