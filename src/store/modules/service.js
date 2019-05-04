// import axios from 'axios'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    services: [],
    service: {}
  },
  mutations: {
    setServices (state, payload) {
      state.services = payload
    },
    setService (state, payload) {
      state.service = payload
    }
  },
  actions: {
    async getServices ({ commit, dispatch }) {
      let service = await authInstance.get('/order/service/').then(r => r.data)

      commit('setServices', service)
    },
    async getService ({ commit, dispatch }, id) {
      let service = await authInstance.get(`/booking/${id}/`).then(r => r.data)

      commit('setService', service)
    }

  },
  getters: {

  }
}
