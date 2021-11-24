import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueJwtDecode from 'vue-jwt-decode'

Vue.config.productionTip = false
Vue.use(VueJwtDecode)

new Vue({
  router,
  store,
  vuetify,
  VueJwtDecode,
  render: h => h(App),
}).$mount('#app')
