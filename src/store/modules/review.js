import router from '@/router'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    error: {},
    review: {}
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    setReviewForm (state, payload) {
      state.review = payload
    }
  },
  actions: {
    async doReview ({ commit, state }, id) {
      let review = await authInstance.post('/review/', { ...state.review, booking_id: id }).then(r => r.data)

      if (review.error) {
        commit('setError', {
          ...review.error
        })
      }

      if (!review.error) {
        commit('setReviewForm', {})
        commit('setError', {})
        router.push('/review')
      }
    },
    async doEditReview ({ commit, state }, id) {
      let review = await authInstance.patch(`/review/${id}/`, { ...state.review }).then(r => r.data).catch(e => e.response.data)

      if (review.errors) {
        commit('setError', {
          ...review.errors
        })
      }

      if (!review.errors) {
        commit('setReviewForm', {})
        commit('setError', {})
        router.push('/review')
      }
    }
  },
  getters: {}
}
