## Vue computed结合watch监听对象其一属性值的变化

> 我们看下demo：

`a`是一个普通的值当`a`值变化的时候会被监听到，`b`是一个对象不能直接像`a`这样写需要深度监听才能捕捉到，但是当我想去捕捉`b`对象中某一个值的变化时却发现打印出来的两个值是一样的，这样就只能知道对象发生变化却不知道具体哪个值发生了变化。


```
<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      a: 1,
      b: {
        c: 1
      }
    };
  },
  watch: {
    a (val, oldVal) {
      console.info(val, '  ', oldVal);
    },
    b: {
      handler (val, oldVal) {
        console.info(val.c, '  ', oldVal.c);
      },
      deep: true
    }
  },
  mounted () {
    setTimeout(() => {
      console.info('改变响应式数据');
      this.a = 2;
      this.b.c = 2;
    }, 2000);
  }
}
</script>

```
输出：

```
改变响应式数据
a：2 "  " 1
b.c：2 "  " 2
```

#### 解决方法：

如果想监听对象某一个值得变化可以利用计算属性`computed`，用`watch`去监听`computed`计算过的值就可以直接知道是哪个对应的值发生了变化。


```
<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      a: 1,
      b: {
        c: 1
      }
    };
  },
  computed: {
    newVal () {
      return this.b.c
    }
  },
  watch: {
    newVal (val, oldVal) {
      console.info(val, '  ', oldVal);
    }
  },
  mounted () {
    setTimeout(() => {
      console.info('改变响应式数据');
      this.b.c = 2;
    }, 2000);
  }
};
</script>

<style scoped>
</style>

```
输出：

```
改变响应式数据
2 "  " 1
```


