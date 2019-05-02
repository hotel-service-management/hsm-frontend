// import axios from 'axios'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    bookings: []
  },
  mutations: {
    setBooking (state, payload) {
      state.bookings = payload
    }
  },
  actions: {
    async getBooking ({ commit }) {
      let booking = await authInstance.get('/booking/').then(r => r.data)

      commit('setBooking', booking)
    }

  },
  getters: {

  }
}
