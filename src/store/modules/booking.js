// import axios from 'axios'
import authInstance from '@/util/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    bookings: [],
    booking: {},
    createForm: {},
    availableRoom: [],
    error: {}
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
    },
    setError (state, payload) {
      state.error = payload
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

      rooms = rooms.map(r => ({ ...r, title: `(${r.type.title}) ${r.room_number} - ${r.price} THB` }))

      commit('setAvailableRooms', rooms)
    },
    async doCreateBooking ({ commit, state }) {
      if (confirm('Are you sure to book?')) {
        let info = await authInstance.get('/auth/user').then(r => r.data)

        let booking = await authInstance.post(`/booking/`, { ...state.createForm, owner: info.user.id }).then(r => r.data)

        if (booking.error) {
          commit('setError', booking.error)
        }

        if (!booking.error) {
          commit('setError', {})
          router.push(`/booking/payment/${booking.id}`)
        }
      }
    },
    async doPayment ({ dispatch }, payment) {
      if (confirm('Are you sure to proceed?')) {
        let pay = await authInstance.post(`/payment/`, { ...payment }).then(r => r.data)

        if (!pay.error) {
          router.push('/payment/completed')
        }
      }
    },
    async doPaymentCheckout ({ dispatch }, payment) {
      if (confirm('Are you sure to proceed?')) {
        let pay = await authInstance.post(`/payment/`, { ...payment }).then(r => r.data)

        if (!pay.error) {
          dispatch('doCheckout', payment.booking_id)
          router.push('/booking/checkout/completed')
        }
      }
    },
    async doCheckout ({ commit, state }, id) {
      await authInstance.patch(`/booking/${id}/`, { status_id: 2, check_out: new Date().toISOString() }).then(r => r.data)
    }
  }
}
