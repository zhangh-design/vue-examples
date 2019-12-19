import Vue from 'vue'
import App from './App.vue'
import ref from 'vue-ref'
import TodoList from './components/TodoList.vue'

Vue.component('todo-list', TodoList)
Vue.use(ref, {
  name: 'ant-ref'
})
Vue.config.productionTip = false

// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  render: h => h(App)
}).$mount('#app')
