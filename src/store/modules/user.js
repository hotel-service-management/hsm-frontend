import axios from 'axios'
import router from '@/router'

const instance = axios.create()

instance.interceptors.response.use(response => {
  return { error: false, ...response.data }
}, error => {
  return { error: true, ...error.response.data }
})

export default {
  namespaced: true,
  state: {
    refresh: localStorage.getItem('refresh') || '',
    access: localStorage.getItem('access') || '',
    email: '',
    password: '',
    error: {
      email: [],
      password: []
    },
    info: {

    }
  },
  mutations: {
    setToken (state, payload) {
      state.access = payload.access
      state.refresh = payload.refresh
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setPassword (state, payload) {
      state.password = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    async doLogin ({ commit, state }) {
      let token = await instance.post('/api/auth/login', { email: state.email, password: state.password })
      if (!token.error) {
        localStorage.setItem('access', token.access)
        localStorage.setItem('refresh', token.refresh)
        commit('setToken', token)
        commit('setEmail', '')
        commit('setPassword', '')
        router.push('/dashboard')
      }

      // Django validations
      if (token.error && token.errors) {
        commit('setError', token.errors)
      }

      // Credential not match
      if (token.error && token.detail) {
        commit('setError', {
          email: token.detail,
          password: []
        })
      }
    },
    doLogout ({ commit }) {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      commit('setEmail', '')
      commit('setPassword', '')
      router.push('/')
    }
  },
  getters: {
    isLoggedIn: state => !!state.access && !!state.refresh
  }
}
