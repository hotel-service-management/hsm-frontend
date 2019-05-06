// import axios from 'axios'
import authInstance from '@/util/auth'
import router from '@/router'

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
    setCreateForm (state, payload) {
      state.createForm = payload
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
    async getAvailableRoom ({ commit }, date) {
      const { startDate, endDate } = date
      let rooms = await authInstance.get(`/booking/room/?start_date=${startDate}&&end_date=${endDate}`).then(r => r.data)

      rooms = rooms.map(r => ({ ...r, title: `(${r.type}) ${r.room_number} - ${r.price} THB` }))

      commit('setAvailableRooms', rooms)
    },
    async doCreateBooking ({ commit, state }) {
      if (confirm('Are you sure to book?')) {
        let info = await authInstance.get('/auth/user').then(r => r.data)
        console.log(info)

        let booking = await authInstance.post(`/booking/`, { ...state.createForm, owner: info.user.id }).then(r => r.data)

        router.push(`/booking/payment/${booking.id}`)
      }
    },
    async doPayment ({ commit, state }, payment) {
      if (confirm('Are you sure to proceed?')) {
        let pay = await authInstance.post(`/payment/`, { ...payment }).then(r => r.data)

        if (!pay.error) {
          router.push('/payment/completed')
        }
      }
    }
  }
}
