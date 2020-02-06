## vue.observable 实现状态共享

使用`Vue`进行开发时，随着项目的复杂化，组件个数也逐渐增加，此时我们就面临着一个问题——多组件状态共享。也许有人说这不是啥问题，`Vuex`就可以解决啊。

是的，`Vuex`可以解决多组件状态共享的问题，但是如果此时我们的项目没有那么大那么复杂，还要使用`Vuex`来解决这个问题吗？答案是否定的，因为这会导致代码繁琐冗余。

那该怎么办？其实我们还可以通过`vue.js2.6`版本新增的`Observable API`来解决这个问题。


- 示例1：`Observable`实现多组件状态共享

1. 创建一个 `observable-store.js`，包含一个`store`和一个`mutations`，分别用来指向数据和处理方法。

```
/**
 * 使用 vue.observable 来实现一个状态共享
 */
import Vue from 'vue'

const obj = { count: 0 }
export const store = Vue.observable(obj)
export const mutations = {
  setCount (count) {
    store.count = count
  }
}

```




2. 在 App.vue里面引入这个 store.js，使用引入的数据和方法。

```
<template>
  <div id="app">
    <p>count: {{count}}</p>
    <button @click="setCount(count+1)">+1</button>
    <button @click="setCount(count-1)">-1</button>
    <child></child>
  </div>
</template>
<script>
import { store, mutations } from './observable-store.js'
import Child from './components/b.vue'
export default {
  components: {
    Child
  },
  data () {
    return {}
  },
  computed: {
    count () {
      return store.count
    }
  },
  methods: {
    setCount: mutations.setCount
  }
}
</script>
<style>
</style>

```

Child.vue

子组件中的 count 也会同时更新。

```
<template>
  <p>子组件 computed 属性 count: {{count}}</p>
</template>

<script>
import { store } from '../observable-store.js'
export default {
  computed: {
    count () {
      return store.count
    }
  }
}
</script>

<style>

</style>

```
