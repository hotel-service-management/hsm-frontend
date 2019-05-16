import Vue from 'vue'
import VueWait from 'vue-wait'
import { Plugin } from 'vue-fragment'
import VueGoogleMaps from 'vue-googlemaps'

import App from './App.vue'
import router from './router'
import store from './store/index'

import './plugins/vuetify'
import 'vue-googlemaps/dist/vue-googlemaps.css'

Vue.config.productionTip = false

Vue.use(Plugin)
Vue.use(VueWait)
Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyBBHdVsKBemm_gv_EiMMyYxKOuLRAnUiMs',
    libraries: ['places'],
    useBetaRenderer: false
  }
})

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app')
