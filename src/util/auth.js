import axios from 'axios'
import store from '@/store/index'

let authInstance = axios.create({
  baseURL: `/api`,
  headers: {
    'Authorization': 'Token ' + (localStorage.getItem('access') || '')
  }
})

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (accessToken) {
  subscribers = subscribers.filter(callback => callback(accessToken))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

async function fetchAccessToken () {
  const refresh = (localStorage.getItem('refresh') || '')

  let token = await axios.post('/api/auth/login/refresh/', { refresh })

  return token.data.access
}

authInstance.interceptors.response.use((response) => response, (error) => {
  const { config, response: { status, data } } = error
  let originalRequest = config

  originalRequest['baseURL'] = '/'

  // Access token expired
  if (status === 403) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      fetchAccessToken().then(token => {
        store.commit('user/setAccess', token)
        localStorage.setItem('access', token)
        authInstance.defaults.headers['Authorization'] = 'Token ' + token
        isAlreadyFetchingAccessToken = false
        onAccessTokenFetched(token)
      }).catch(err => {
        store.dispatch('user/doLogout')
        console.log('catched', err)
      })
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(accessToken => {
        originalRequest.headers['Authorization'] = 'Token ' + accessToken
        resolve(axios(originalRequest))
      })
    })
    return retryOriginalRequest
  }
  return Promise.reject(error)
})

export default authInstance
