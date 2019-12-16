## vue中响应式数据如果没有在模板中输出，则改变数据不会触发updated钩子

我们有时候会通过 `updated`钩子函数来达到一个监听组件更新的功能，但是如果我们修改的响应式数据并没有在模板中进行输出，那么`updated`钩子函数是不会触发的。

```
<template>
  <div>
    <!--如果不输出msg变量，updated钩子函数不会触发，因为dom没有发生改变-->
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 1
    }
  },
  updated () {
    console.info('视图更新了');
  },
  mounted () {
    setTimeout(() => {
      console.info('修改data对象中的属性');
      this.msg = 2
    }, 2000);
  }
}
</script>

<style scoped>

</style>

```
输出：

```
修改data对象中的属性
视图更新了
```

update钩子函数官网介绍：
https://cn.vuejs.org/v2/api/#updated

