<template>
  <div id="app">
    {{ count }}
    <br />
    {{ $store.getters.doubleCount }}
    <button @click="$store.commit('increment', 2)">count ++</button>&nbsp;
    <button @click="$store.dispatch('increment')">count ++</button>
  </div>
</template>
<script>
export default {
  components: {},
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

</style>
