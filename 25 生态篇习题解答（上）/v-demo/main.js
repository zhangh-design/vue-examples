import Vue from 'vue'
import App from './App.vue'
import Vuex from './min-vuex.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
})
// 上一个版本是通过原型挂载的方式定义的$store
// Vue.prototype.$store = store
new Vue({
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  render: h => h(App)
}).$mount('#app')
