<template>
  <div id="app">
		{{count}}
    {{$store.getters.doubleCount}}
    <button @click="$store.commit('increment')">count++</button>
  </div>
</template>
<script>
export default {
	computed: {
    count() {
      return this.$store.state.count
    }
  },
  data () {
    return {
      name: 'APP.vue'
    }
  },
  mounted () {
    console.info(this.$store);
  }
}
</script>
<style></style>
