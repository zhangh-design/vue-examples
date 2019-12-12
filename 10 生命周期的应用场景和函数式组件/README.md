## 生命周期的应用场景和函数式组件

> 前言 

这节课我们来聊一聊`Vue`组件生命周期的应用场景和函数式组件，每一个`Vue`组件被创建的时候都会经过一系列的初始化过程包括它数据更新的时候也会经过一些列的钩子函数给我们执行一些业务逻辑代码包括它销毁的时候也会提供给我们一些钩子让我们执行一些操作这一些列的过程然后我们称之为`生命周期`。

那`生命周期`的话主要分为三个阶段:
1. 创建阶段
2. 更新阶段
3. 销毁阶段

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/10%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6/1.jpg)

除了 `创建阶段`和`销毁阶段`之外它们这两个阶段是在组件的生命周期中只会执行一次其它的一个更新阶段会执行多次。


我们先来看下`创建阶段`：

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/10%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6/2.jpg)

创建阶段的话首先它会经过一个我们的`beforeCreate`，在`beforeCreate`之前我们会执行我们事件的一个初始化包括我们生命周期的一个初始化，在`beforeCreate`之后我们会开始对我们的数据做响应式化处理还有属性和侦听器的配置等，在这之后我们开始执行我们的`createElement`这样一个生命周期，在这`createElement`之后我们会到了我们模板编译的阶段，在模板编译到我们的`render`这一阶段那如果说你是直接写的`render`函数的话实际上这个阶段是被跳过的但是一般情况下我们是写`remplate`这样一个形式所以说它会有一个模板编译到`render`函数的阶段，这些阶段呢对我们来说其实都是透明的是不需要用到的应该说，在接下来就是我们的`beforeMount`，`beforeMount`之后就是开始执行我们的一个`render`，在这时候`render`的时候会给我们生成一个我们的`虚拟Dom`然后render渲染虚拟Dom之后开始去挂载一个真实的Dom，挂载完成之后才开始执行我们的一个`mounted`，我们一般在`mounted`里面会去做一些异步的请求还有操作Dom还有一个定时器，但是在`mounted`之后`Vue`它并不承诺我们可以去它的一个子组件的一个`Dom`也会真正的一个挂载到我们的真实`Dom`上所以说有的时候我们需要一个`this.$nextTick`来去把这些我们操作`Dom`的事情放到这个回调中。


接下来是我们的更新阶段，那更新阶段它是一个被多次执行的一个阶段我们在我们数据变化的时候或者是我们强制更新的时候就是我们调用`this.$forceUpdate()`强制更新我们的组件的时候它开始去执行我们的一个`beforeUpdate`，在`beforeUpdate`里面一般我们去做一些移除我们已经添加了的`事件监听器`这个其实我们正常的开发中可能并不太会需要用到`事件监听器`，因为`Vue`它本身提供了一个事件绑定监听机制已经足够我们使用了但是如果你是开发一些通用的组件库那很底层的一些东西那有可能会需要用到这样一个`事件监听器`的一个添加的功能，那接下来`beforeUpdate`之后我们就开始还是执行我们的`render`开始去生成一个最新的虚拟Dom在之后就开始去挂载我们的一个真实Dom去更新真实的Dom，然后完成之后就开始调用我们的`updated`，这里也和`mounted`一样它也不承诺子组件已经更新完这时候如果你要操作Dom的话依然也需要放到`this.$nextTick()`的回调中，这时候我们可能会需要添加一些事件监听器同样和`beforeUpdate`一样我们如果说你是业务开发可能并不太会需要，==但这里有一点特别需要注意的是你在`beforeUpdate`和`updated`里面你万万不可以更改我们的依赖数据就是说我们响应式的数据如果你更改了就会导致一个死循环因为你一旦更改就开始执行我们这个更新阶段，一旦更改就开始执行更新阶段，直到你的浏览器爆掉==。

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/10%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6/3.jpg)


那最后就是我们的销毁阶段，组件你被销毁之后也会提供给我们两个钩子一个是`beforeDestory`就是我们销毁之前执行的在这里我们一般也是去移除我们已经添加的事件监听器还有我们的计时器等还有一个是`Destoryed`，`Destoryed`呢其实知道现在我也很少用到这样的一个生命周期我想大家可能基本上用`beforeDestory`基本上可以满足大家。


![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/10%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6/4.jpg)

我们看一个Demo:

我们这里有一个时钟的功能，这个时钟其实就是我们开始计时这样的一个功能，我应该刷新一下浏览器让大家看到我们组件的一个创建过程，你会看到我在控制台里面把所有生命周期它里面的一些日志包括它的一个顺序都能很明确的看到从`beforeCreate`到`mounted`，好我现在开始点`开始按钮`，开始完我点停止，你会看到`beforeUpdate`、`render`、`updated`然后就这样的一个阶段循环输出直到我点击`停止按钮`，然后我现在点击`销毁按钮`同样也是执行了两个周期的钩子，我们看一下我们的代码，其实代码很简单代码我主要是给大家演示我们整个的生命周期它的一个执行顺序帮助大家进一步的理解，我点开始的时候开始触发我们的这个计时，我们在计时当中开始去改变我们的`this.now`去更改这样的一个时间来触发我们组件的一个更新去执行我们的一个更新阶段，我在外层的`index.vue`中点击销毁的时候就是把这个时钟给销毁掉让这个`Clock`这个时钟去触发它一个销毁阶段的一个周期，然后我在`beforeDestroy`中把这个计时器然后`clearInterval`掉然后如果你不在这里`clearInterval`掉会导致你的内存泄露。

```
<template>
  <div>
    {{ log("render") }}
  </div>
</template>
<script>
  export default {
    data: function () {
      console.log('data')
      this.log = window.console.log
      return {}
    },
    beforeCreate () {
      console.log('beforeCreate')
    },
    created () {
      console.log('created')
    },
    beforeMount () {
      console.log('beforeMount')
    },
    mounted () {
      console.log('mounted')
    },
    beforeUpdate () {
      console.log('beforeUpdate');
    },
    updated () {
      console.log('updated');
    },
    beforeDestroy () {
      console.log('beforeDestroy');
      clearInterval(this.clockInterval);
    },
    destroyed () {
      console.log('destroyed');
    },
    methods: {
     startClock () {
       clearInterval(this.clockInterval);
       if (this.start) {
          this.clockInterval = setInterval(() => {
          this.now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        }, 1000);
      }
     }
    }
  }
</script>
```
初始时的输出：

- beforeCreate
- data
- created
- beforeMount
- render
- mounted

点击开始时的输出：

- beforeUpdate
- render
- updated
- beforeUpdate
- render
- update
- ......

点击销毁时的输出：
- beforeDestroy
- destroyed



我们在看一下函数式组件，函数式组件是一个比较特殊的组件相对于普通组件来说它是没有状态的也是没有实例的
没有this上下文当然也没有生命周期，它其实就是一个简单的方法你可以这么认为，我们需要的只是在我们的组件中定义的时候给它一个`functional:true`然后它就被我们声明成了一个函数式组件，但函数式组件它虽然说没有状态没有实例没有生命周期但我们依然可以去做一些有意思的事情，函数式组件我们一般是用来做展示用的但我们依然可以借助函数式组件做一些有意思的事情包括我们在前面章节中提到过的一个我们通过函数式组件来去渲染我们的`VNode`我这里有一个很有意思的东西就是说我们借助函数式组件来实现我们在模板中做`临时变量`这样一个事情，在`Vue`的模板中它是没有提供临时变量这样的一个功能的但是我们开发过程中`临时变量`是非常有必要的
不然的话你在你的模板中会出现多次重复的一个逻辑计算当然我们的计算属性在很大程度上已经帮我们避免了这个事情但是计算属性它是有一个限制就是说我们依赖的数据必须是我们的响应式数据而且你在模板中可能还会需要一些`v-for`、`v-if`、`v-show`这样的一些数据有些数据而且是来至于全局的这样的一个情况，这时候我们就需要一个为了避免我们的重复计算可能就需要一个临时变量那我们可以借助我们的一个`函数式组件`来去达到这样的一个效果。

1. functional: true
2. 无状态、无实例、没有this上下文、无生命周期

函数式组件这样的一个临时变量的功能的组件其实也很简单，我只要在`render`的时候直接把我传递的一个属性返回给我调用方，大家看到我们在这里使用的时候我给它传了一个`var1`一个`var2`这两个变量通过这样的一个形式我通过`template`通过我的一个作用域插槽`v-slot="{var1, var2}"`返回出来我的一个`var1`和`var2`这时候这个`var1`、`var2`就已经成为了我们的一个临时变量，这样后面我们在使用的时候我们可以在我们这个`template`中随便可以使用随时可以使用我们的这个`var1`、`var2`这样就达到了我们一个临时变量的需求。


```
<template>
  <TempVar
    :var1="`hello ${name}`"
    :var2="destroyClock ? 'hello vue' : 'hello world'"
    >
      <template v-slot="{ var1, var2 }">
        {{ var1 }}
        {{ var2 }}
      </template>
  </TempVar>
</template>
export default {
  functional: true,
  render: (h, ctx) => {
    // 去调用作用域插槽函数并传递参数var1，var2
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {});
  }
};
```




