import Vue from 'vue'
import VueWait from 'vue-wait'
import { Plugin } from 'vue-fragment'

import App from './App.vue'
import router from './router'
import store from './store/index'

import './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Plugin)
Vue.use(VueWait)

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app')
