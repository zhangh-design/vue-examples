<template>
  <li>
    <slot name="pre-icon" :value="value_v"></slot>
    <span class="red" v-if="!del">{{title}}</span>
    <span v-else style="text-decoration: line-through;">{{title}}</span>
    <slot name="suf-icon">(*￣▽￣*)</slot>
    <button v-show="del" @click="handlerClick">删除</button>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    del: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      value_v: Math.random()
    }
  },
  mounted () {},
  methods: {
    handlerClick (e) {
      e.stopPropagation()
      console.log('点击删除按钮')
      this.$emit('delete', this.title, 0)
    }
  }
}
</script>

<style scoped>
.red{
  color: red
}
</style>
