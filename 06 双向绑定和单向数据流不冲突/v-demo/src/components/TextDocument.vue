<template>
  <div>
    <input type="button" value="修改课程测试.sync" @click="handlerClick"/>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handlerClick () {
      this.$emit('update:title', '语文课')
    }
  }
}
</script>

<style>

</style>
