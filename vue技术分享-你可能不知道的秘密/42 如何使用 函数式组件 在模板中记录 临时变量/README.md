## 如何使用函数式组件在模板中记录临时变量

> 前言：函数式组件我们在开发中可能并不常用，但是我们还是可以用函数式组件来实现一些有意思的事情。

`Vue`在`template`模板中是并没有提供临时变量这样一个功能的，但是我们开发过程中临时变量是非常有必要的不然的话你在你的模板中会出现多次重复的一个逻辑计算当然我们的计算属性在很大程度上已经帮我们避免了这个事情但是计算属性它是有一个限制就是说我们依赖的数据必须是我们的响应式数据而且你在模板中可能还会需要一些v-for、v-if、v-show这样的一些数据有些数据而且是来至于全局的这样的一个情况这时候我们就需要一个为了避免我们的重复计算可能就需要一个临时变量那我们可以借助我们的一个函数式组件来去达到这样的一个效果。

临时变量的实现：

##### 直接使用一个响应式变量充当临时变量来使用：

有点：直接通过`{{}}`双大括号的形式来使用。

缺点：只能充当一个变量无法实现计算逻辑，并且临时变量可能需要来至于全局。

##### 计算属性：

优点：可以帮助我们避免重复的逻辑计算

缺点：依赖的数据必须是响应式的数据 ，我们的临时变量可能需要来至于全局。

##### method 方法实现：

优点：变量既可以是响应式的也可以是普通的变量，也可以是全局的。

缺点：多次使用临时变量会导致多次计算。

##### functional 函数式组件来实现：

优点：变量既可以是响应式的也可以是普通的变量，不需要重复计算，也可以来至于全局。

缺点：需要创建一个函数式组件的插件。

###### 结论：

从上面的分析可以看出我们使用`函数式组件` 来实现是最优的一个解决方案。


##### 示例：


函数式组件：

TempVar.js

```
export default {
  functional: true,
  render: (h, ctx) => {
    // 调用名为 default 的默认插槽函数，并将参数props传入
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {});
  }
};
```

index.vue


```
<template>
  <div>
    <TempVar
      :var1="`hello ${name}`"
      :var2="destroyClock ? 'hello vue' : 'hello world'"
      >
        <!-- 意思还是我在TempVar组件中去调用名为 default 的作用域插槽函数然后传入两个参数 var1和var2，这样在作用域插槽内部
        就可以使用传入的变量了。
        -->
        <template v-slot:default="{ var1, var2 }">
          {{ var1 }}
          {{ var2 }}
        </template>
    </TempVar>
  </div>
</template>
<script>
import TempVar from './TempVar.js'
export default {
  components: {
    TempVar
  },
  data () {
    return {
      name: 'vue'
    }
  }
}
</script>
```

