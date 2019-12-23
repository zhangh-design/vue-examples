import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment ({ state }) {
      setTimeout(() => {
        state.count++
      }, 1000);
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  },
  modules: {
  }
})
