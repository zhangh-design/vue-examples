## vue.sync双向绑定

`Vue`中`.sync`的功能是：当一个子组件改变了一个`prop`的值时，这个变化也会同步到父组件中多绑定，如果我们不用`.sync`我们也可以`props`传初始值然后事件监听实现起来也不算复杂，这里用`.sync`实现只是给大家提供一个思路，让其明白它的实现原理可能有其它复杂的功能适用`.sync`。


它会被扩展为一个自动更新父组件属性的`v-on`监听器。
示例代码如下：
```
<comp :foo.sync="bar"></comp>
```
会被扩展为：

```
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

当子组件需要更新`foo`的值时，它需要在子组件中显示的触发一个更新事件：

```
this.$emit('update:foo', newValue)
```

#### sync单个值demo：

父组件Index.vue：
```
<template>
  <div>
    父组件：{{name}}
    <child :name.sync="name"></child>
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
      name: '小明'
    }
  },
  mounted () {
    setTimeout(() => {
      this.name = '丽丽'
    }, 4000);
  }
}
</script>
```

子组件Child.vue：

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
    setTimeout(() => {
      this.$emit('update:name', '李雷')
    }, 2000);
  }
}
</script>
```

#### sync对象的demo：

父组件Index.vue：

```
<template>
  <div>
    <!--v-bind.sync传递某个对象-->
    <child v-bind.sync="doc"></child>
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
      doc: {
        one: '语文',
        two: '数学',
        three: '科学'
      }
    }
  },
  mounted () {}
}
</script>

```

子组件Child.vue：


```
<template>
  <div>
    {{one}}
    {{two}}
    {{three}}
  </div>
</template>

<script>
export default {
  props: {
    // 分别接收对象中的每个值
    one: { type: String },
    two: { type: String },
    three: { type: String }
  },
  data () {
    return {};
  },
  mounted () {
    setTimeout(() => {
      // 改变对象中的某一个值
      this.$emit('update:one', '英语')
    }, 2000);
  }
};
</script>

```
