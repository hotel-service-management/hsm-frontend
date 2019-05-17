import axios from 'axios'
import router from '@/router'
import authInstance from '@/util/auth'

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

    },
    info: {

    },
    register: {

    },
    update: {

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
    },
    setInfo (state, payload) {
      state.info = payload
    },
    setAccess (state, payload) {
      state.access = payload
    },
    setUser (state, payload) {
      state.info = payload
    },
    setRegisterForm (state, payload) {
      state.register = payload
    },
    setUpdateForm (state, payload) {
      state.update = payload
    }
  },
  actions: {
    async doLogin ({ commit, state, dispatch }) {
      let token = await instance.post('/api/auth/login', { email: state.email, password: state.password })
      if (!token.error) {
        localStorage.setItem('access', token.access)
        localStorage.setItem('refresh', token.refresh)
        commit('setToken', token)

        commit('setEmail', '')
        commit('setPassword', '')
        commit('setError', {})
        dispatch('doGetInfo')

        router.push('/booking')
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
    async doRegister ({ commit, dispatch, state }) {
      let user = await instance.post('/api/auth/register', { ...state.register })

      if (user.error && user.errors) {
        commit('setError', {
          ...user.errors
        })
      }

      if (!user.error) {
        // await commit('setEmail', state.register.email)
        // await commit('setPassword', state.register.password)

        // dispatch('doLogin')

        router.push('/')

        commit('setRegisterForm', {})
        commit('setError', {})
      }
    },
    async doLogout ({ commit }) {
      // Clear Local Storage
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')

      // Clear up store
      commit('setToken', { access: '', refresh: '' })
      commit('setEmail', '')
      commit('setPassword', '')

      // Redirect Home
      router.push('/')
    },
    async doGetInfo ({ commit }) {
      let info = await authInstance.get('/auth/user').then(r => r.data)
      commit('setUser', { ...info.user })
    },
    async doUpdateProfile ({ state, commit }) {
      let user = await authInstance.patch('/auth/user', { ...state.update }).then(r => r.data)

      if (user.errors) {
        commit('setError', user.errors)
      }

      if (!user.errors) {
        router.push('/profile')
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.access && !!state.refresh,
    getToken: state => ({ access: state.access, refresh: state.refresh })
  }
}
