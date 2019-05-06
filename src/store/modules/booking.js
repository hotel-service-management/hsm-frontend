// import axios from 'axios'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    bookings: [],
    booking: {},
    createForm: {}
  },
  mutations: {
    setBookings (state, payload) {
      state.bookings = payload
    },
    setBooking (state, payload) {
      state.booking = payload
    }
  },
  actions: {
    async getBookings ({ commit }) {
      let booking = await authInstance.get('/booking/').then(r => r.data)

      commit('setBookings', booking)
    },
    async getBooking ({ commit }, id) {
      let booking = await authInstance.get(`/booking/${id}/`).then(r => r.data)

      commit('setBooking', booking)
    },
    async getAvailableRoom ({ commit }, startDate, endDate) {

    }
  },
  getters: {

  }
}
