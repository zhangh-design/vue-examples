## `Vue` `watch`的`deep`属性

如果我们用`watch`监视一个对象的时候，往往得不到正确的结果，例如：

我们定义了一个对象`obj`，将输入框和`obj.name`进行绑定，那么我们利用`watch`去监测`obj`，那么当输入框输入内容的时候，`watch`的`obj`是不会触发的。

```
<template>
  <div>
    <!-- 改变 obj 对象中的 name 属性不会触发 watch -->
    <input type="text" v-model="obj.name"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        name: ''
      }
    }
  },
  created () {
    // 需要将整个 obj 对象重新赋值才能触发 watch，内部属性的变化不会触发 watch
    /*setTimeout(() => {
      this.obj = { name: '小明' }
    }, 3000);*/
  },
  watch: {
    obj: function (val, oldVal) {
      console.info(val.name, oldVal.name);
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

此时可以用`deep`，因为用`watch`去监测`obj`，只有`obj`发生变化才会触发，如果是`obj.name`变化则没反应，如果用`deep`的话，表示可以监测到`obj`的下层变动：

==（但是这里会有一个问题就是 `val.name` 和 `oldVal.name` 它俩的输出值是一样的，这个问题我们在 `06 Vue computed结合watch监听对象其一属性值的变化`中在进行讲解，这里我们只讲解如何使用 `deep` 属性来达到监听对象变化的功能）==
```
<template>
  <div>
    <input type="text" v-model="obj.name"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        name: ''
      }
    }
  },
  created () {},
  watch: {
    obj: {
      handler: 'fetchPostList',
      deep: true
    }
  },
  methods: {
    fetchPostList (val, oldVal) {
      // 获取数据的操作
      console.log('获取数据的操作', val.name, oldVal.name)
    }
  }
}
</script>

```
输出：

获取数据的操作 1 1

获取数据的操作 12 12

......


但是如果用`deep`的话，还会有一些副作用，假如`obj`还有一个`age`属性，那么`age`属性的变动也会被检测到。如果只是想单纯的检测`obj.name`的变动，直接检测`obj.name`可能会更好：


```
<template>
  <div>
    <input type="text" v-model="obj.name"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        name: '',
        age: 10
      }
    }
  },
  created () {
    // 改变 obj.age 不会触发 watch
    setTimeout(() => {
      this.obj.age = 11
    }, 3000);
  },
  watch: {
    // 只监测 obj.name 的变动
    'obj.name': {
      handler: 'fetchPostList',
      deep: true
    }
  },
  methods: {
    fetchPostList (val, oldVal) {
      // 获取数据的操作
      console.log('获取数据的操作')
    }
  }
}
</script>

```

##### 注意：

`watch`观察的对象不能用箭头函数，否则`this`是`undefined`。

```
watch: {
    'obj.name': ()=>{
        console.info(this); //undefined
    }
}
```



