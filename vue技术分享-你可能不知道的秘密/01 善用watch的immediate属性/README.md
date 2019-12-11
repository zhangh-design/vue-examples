## 善用`watch`的`immediate`属性

这一点我在项目中也是这么写的。例如有请求需要在没初始化的时候就执行一次，然后监听它的变化。


很多人会这么写：

我们将这个输入框的内容绑定一个变量`value`，同时利用 `watch`去监视`value`有没有发生变化，如果变化了就去调用`fetchPostList`，然后在`created`里面调用`fetchPostList`，因为已进入的时候需要调用一次。
```
<template>
  <div>
    <input type="text" v-model="value"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {
    // 在create生命周期钩子函数中手动执行
    this.fetchPostList()
  },
  watch: {
    // 监听value值的变化
    value (val, oldVal) {
      this.fetchPostList()
    }
  },
  methods: {
    fetchPostList () {
      // 获取数据的操作
      console.log('获取数据的操作')
    }
  }
}
</script>
```

其实上面的第一次调用`fetchPostList`可以在`watch`中配置一个`immediate`，就像这样：

```
<template>
  <div>
    <input type="text" v-model="value"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {},
  watch: {
    // 已进入时会调用一次 fetchPostList ，以后监听到 value 变化后会自动调用 fetchPostList 方法
    value: {
      handler: 'fetchPostList',
      immediate: true
    }
  },
  methods: {
    fetchPostList () {
      // 获取数据的操作
      console.log('获取数据的操作')
    }
  }
}
</script>
```

`immediate`表示立即执行的意思，这样就是说不用等到`value`变化才会执行，默认的时候就会立刻执行一次。

`handler`表示需要调用的方法。

##### 注意：
`watch`观察的对象不能用箭头函数，否则`this`是`undefined`。

```
watch: {
    'obj.name': ()=>{
        console.info(this); //undefined
    }
}
```
