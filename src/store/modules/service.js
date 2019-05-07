// import axios from 'axios'
import authInstance from '@/util/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    services: [],
    service: {},
    cart: []
  },
  mutations: {
    setServices (state, payload) {
      state.services = payload
    },
    setService (state, payload) {
      state.service = payload
    },
    setCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    async getServices ({ commit }) {
      let service = await authInstance.get('/order/service/').then(r => r.data)

      commit('setServices', service)
    },
    async getService ({ commit }, id) {
      let service = await authInstance.get(`/booking/${id}/`).then(r => r.data)

      commit('setService', service)
    },
    addService ({ state, commit }, service) {
      let id = state.cart.map(s => s.id)
      let cart = state.cart
      if (!id.includes(service.id)) {
        cart.push(service)
        commit('setCart', cart)
      }
    },
    deleteService ({ state, commit }, index) {
      let cart = state.cart
      cart.splice(index, 1)
      commit('setCart', cart)
    },
    async doSubmitOrder ({ state, commit }, id) {
      if (confirm('Are you sure to order?')) {
        let order = await authInstance.post('/order/', {
          booking_detail_id: id,
          service: state.cart.map(s => s.id),
          total_price: state.cart.reduce((a, b) => a + b.price, 0)
        }).then(r => r.data)
        commit('setCart', [])
        router.push(`/order/${order.id}`)
      }
    }

  },
  getters: {

  }
}
