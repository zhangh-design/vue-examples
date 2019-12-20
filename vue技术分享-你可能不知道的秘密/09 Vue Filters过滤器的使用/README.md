## Vue Filters过滤器的使用

场景：常见的数据文本的格式化

index.vue
```
<template>
  <div>
    <div>{{ message | myDateFormat }}</div>
    <child v-bind:update_time="message | myDateFormat"></child>
  </div>
</template>
<script>
import Child from './Child.vue'
import dateformat from 'dateformat-util'
export default {
  components: {
    Child
  },
  data () {
    return {
      message: 18324798324789
    }
  },
  mounted () {},
  filters: {
    myDateFormat (value) {
      if (!value) return '';
      return dateformat.format(new Date(value), 'yyyy-MM-dd');
    }
  }
}
</script>
```

Child.vue

```
<template>
  <div>
    {{update_time}}
  </div>
</template>

<script>
export default {
  props: {
    update_time: {
      type: String
    }
  },
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style>
</style>

```
