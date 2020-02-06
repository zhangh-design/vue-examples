## 49 模板 template 中使用 functional 函数式组件

函数式组件是一种`stateless`（无状态）和`instanceless`（无实例）的组件，它内部没有生命周期处理方式，因而非常轻量，渲染性极高，当需要创建的组件只需要根据外部数据的变化而变化时，就可以将其创建为函数式组件。

**写法如下：**

- 在 template标签里面标明 functional
- 只接受 props值
- 不需要 script标签

APP.vue

```
<template>
  <div id="app">
    <p>clicked hero : {{clicked}}</p>
    <list :items="['Wonderwoman','Ironman']" :item-click="item=>(clicked = item)"></list>
  </div>
</template>
<script>
import List from './components/b.vue'
export default {
  components: {
    List
  },
  data () {
    return {
      clicked: ''
    }
  }
}
</script>
<style>
</style>

```


List.vue

```
<template functional>
  <div>
    <p v-for="item in props.items" :key="item" @click="props.itemClick(item);">
      {{item}}
    </p>
  </div>
</template>

<style></style>

```
