## 监听组件的生命周期（父组件监听子组件）

比如有父组件`Parent.vue`和子组件`Child.vue`，如果父组件监听到子组件挂载 `mounted` 生命周期时需要做一些逻辑处理，常规的写法可能如下：


Parent.vue

在父组件模板内的子组件上定义一个自定义事件 `@child-mounted`
```
<template>
 <div>
   <child v-bind:name="nickName" @child-mounted = "doSomething"></child>
 </div>
</template>
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  data () {
    return {
      nickName: '小红'
    }
  },
  methods: {
    doSomething () {
      console.info('子组件已经挂载');
    }
  }
}
</script>
```

Child.vue

子组件在`mounted`生命周期中去手动触发父组件传递过来的自定义事件。
```
<template>
 <div>{{name}}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '小明'
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.$emit('child-mounted')
  }
}
</script>
```


这里提供一种特别简单的方式，子组件不需要任何处理，只需要在父组件引用的时候通过`@hook`来监听即可，代码重写如下：

Parent.vue

父组件使用 `@hook:mounted`
```
<template>
 <div>
   <child v-bind:name="nickName" @hook:mounted = "doSomething"></child>
 </div>
</template>
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  data () {
    return {
      nickName: '小红'
    }
  },
  methods: {
    doSomething () {
      console.info('子组件已经挂载');
    }
  }
}
</script>
```

Child.vue

子组件不需要任何操作
```
<template>
 <div>{{name}}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '小明'
    }
  },
  data () {
    return {}
  },
  mounted () {}
}
</script>
```

#### 结语：

当然这里不仅仅是可以监听 mounted，其它的生命周期事件，例如： created， updated等都可以，是不是特别方便~


