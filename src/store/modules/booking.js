// import axios from 'axios'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    bookings: [],
    booking: {},
    createForm: {},
    availableRoom: []
  },
  mutations: {
    setBookings (state, payload) {
      state.bookings = payload
    },
    setBooking (state, payload) {
      state.booking = payload
    },
    setAvailableRooms (state, payload) {
      state.availableRoom = payload
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
      let rooms = await authInstance.get(`/booking/room/?start_date=${startDate}&&end_date=${endDate}`).then(r => r.data)

      commit('setAvailableRooms', rooms)
    }
  }
}
