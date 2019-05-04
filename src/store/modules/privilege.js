// import axios from 'axios'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    privileges: [],
    privilege: {}
  },
  mutations: {
    setPrivileges (state, payload) {
      state.privileges = payload
    },
    setPrivilege (state, payload) {
      state.privilege = payload
    }
  },
  actions: {
    async getPrivilege ({ commit, dispatch }) {
      let privilege = await authInstance.get('/order/privilege/').then(r => r.data)

      commit('setPrivilege', privilege)
    },
    async getPrivileges ({ commit, dispatch }, id) {
      let privilege = await authInstance.get(`/booking/privilege/${id}/`).then(r => r.data)

      commit('setPrivileges', privilege)
    }

  },
  getters: {

  }
}
