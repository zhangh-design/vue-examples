import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import Vuex from './min-vuex.js'

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
Vue.prototype.$store = store
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
