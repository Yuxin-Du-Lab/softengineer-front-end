import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import store from '@/store/store.js'

Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')
