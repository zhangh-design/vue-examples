<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <!-- {{ count }}
    <br />
    {{ $store.getters.doubleCount }}
    <button @click="$store.commit('increment', 2)">count ++</button>&nbsp;
    <button @click="$store.dispatch('increment')">count ++</button> -->
    {{ count }}
    <br />
    <button @click="$store.commit('increment')">count ++</button>&nbsp;
    <!-- <show-component></show-component> -->
  </div>
</template>
<script>
import showComponent from './components/test/Index.vue'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { showComponent },
  data () {
    return {}
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
