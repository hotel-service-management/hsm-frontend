import Vue from 'vue'
import { Plugin } from 'vue-fragment'

import App from './App.vue'
import router from './router'
import store from './store/index'

import './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
