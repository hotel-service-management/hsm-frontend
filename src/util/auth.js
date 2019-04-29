import axios from 'axios'
import store from '../store/index'

let authInstance = axios.create({
  baseURL: `/api`,
  headers: {
    'Authorization': 'Token ' + store.state.user.access
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
  const { refresh } = store.state.user

  let token = await axios.post('/api/auth/login/refresh/', { refresh })

  return token.data.access
}

authInstance.interceptors.response.use((response) => response, (error) => {
  const { config, response: { status } } = error
  let originalRequest = config

  originalRequest['baseURL'] = '/'

  // Access token expired
  if (status === 403) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      fetchAccessToken().then(accessToken => {
        store.dispatch('user/accessToken', {})
        isAlreadyFetchingAccessToken = false
        onAccessTokenFetched(accessToken)
      }).catch(err => {
        // Send logout!
        console.log('catched', err)
      })
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(accessToken => {
        originalRequest.headers.Authorization = 'Token ' + accessToken
        resolve(axios(originalRequest))
      })
    })
    return retryOriginalRequest
  }
  return Promise.reject(error)
})

export default authInstance
