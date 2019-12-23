## 如何在Vue中使用Vuex

> 前言：那上节课我们讲了`Vuex`它的一个使用场景还有它的一个运行机制，那这节课的话将讲一下具体的使用方式。

那首先的话我们还是使用`Cli`新建一个简单的工程：

命令
```
vue create vuex-demo
```

好那我们需要把我们的这个 demo 改成一个简单的计数器，这个计数器的话我们只需要提供一个`count`的数字就可以了，好现在我们已经有了这样的一个最基础的状态（`vuex的状态`）只是只有一个计算。

在项目中引入`vuex`

```
import Vuex from 'vuex'

// use 的目的是在 Vuex 中让它能够访问到我们的 Vue
Vue.use(Vuex)

// 那这时候我们 new 出来一个我们的 vuex 的 store 实例
const store = new Vuex.Store({
    state: {
      // 我们提供一个 state
      count: 0
    },
    mutations: {
      // 接收 commit 提交
      increment (state) {
        state.count++
      }
    }
})

// 然后我们把这个 store 在 new Vue({}) 的时候把它注入进去，这样的话我们在每个实例访问的时候都可以通过 this.$store 然后就可以访问到我们这个 store 实例了
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

```


我们现在把这个状态我想把它展示出来：

那这时候我要如何访问到我们的 `count` 呢？那我们可以通过我们 `Vue` 的一个计算属性 `computed`直接`return this.$store.state.count`，好那这时候我们已经能够访问到我们这个`count`了好我们打开我们的浏览器看一下效果，好我们现在已经能看到我们展示的这个 `0` 也就是我们已经可以通过我们 `store` 访问到我们这个`count`了。

```
<template>
  <div>
    {{ count }}
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>
```

好那我们现在要改变我们这个 `count` 的数值，我们给`button`一个`click`的事件然后我们要做的就是去改变这个`count`那我们如何去改变我们`store`上面的一个数据呢？然后我们依然可以通过我们的`$store.commit()`，那这时候我去定义`store`实例的地方增加一个`mutations`接收我的`commit`操作执行`count++`。

```
<template>
  <div>
    {{ count }}
    <button @click="$store.commit('increment')">count ++</button>
  </div>
</template>
```

那现在我想变成一个加2的操作，我可以通过`$store.commit('increment', 2)` 这里传递第二个参数。

修改`mutations`中的`increment`接收第二个参数。

```
<template>
 <div>
   <button @click="$store.commit('increment', 2)">count +2</button>&nbsp;
 </div>
</template>
```

```
mutations: {
  // 接收 commit 提交
  increment (state, n) {
    state.count += n
  }
}
```


到这里我们已经完成了最简单的我们的一个`vuex`状态管理那我们还有一些它其它的我们前面也讲到有一个`actions`，`actions`它是做什么的呢就是说我们有的时候可能会向后台发起一些请求我们想要做的是一个异步的操作，这时候我们不能直接在我们的一个`mutations`里面去执行因为我们的`mutations`会需要在我们的`Devtools`里面去做一些记录那这时候我们就可以在这里面去做一些异步的操作。


```
<template>
  <div>
    <button @click="$store.dispatch('increment')">count ++</button>
  </div>
</template>
```

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      // 模拟一个异步操作
      setTimeout(() => {
        context.commit('increment')  
      }, 1000)
    }
    /*
    increment ({state}) {
      // 注意这里不要 state.count++ ，这样 devtools 就记录不到变化状态了
      setTimeout(() => {
        state.count++ 
      }, 1000)
    }
    */
  }
})
```

`vuex`里面还有一个`getter`它是做什么的呢？它有点类似我们组件里面的一个计算属性`computed`它可以帮助我们缓存我们的数据，因为我们这个`state`里面的数据它也是响应式的那既然是响应式的我们就可以充分利用 `Vue`里面提供的这样一个缓存的效果，我们继续我们可以做一个`doubleCount`我想要获取这样一个数据。


```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      setTimeout(() => {
        context.commit('increment')  
      }, 1000)
    }
  },
  getter: {
    doubleCount (state) {
      return state.count * 2      
    }
  }
})
```

好那我在我的页面中怎么获取呢？

```
<template>
  <div>
    {{ $store.getters.doubleCount }}
  </div>
</template>
```
好这就是我们的`getter`起到了一个缓存的机制，和我们的计算属性是一样的。


#### 结语
好到这里我们`vuex`的一个基本的使用方式就已经介绍完了基本涵盖了大部分的使用方式。

那我们留一个课后习题：我们刚才看到我们都是通过`this.$store`然后去获取的这样的一个`store`实例然后去获取的`store`的数据它是如何挂载到我们的实例`this`上的呢我们也只是看到了我们在初始化我们`new vue({})`的时候去提供了这个`store`但是它内部是怎么样去实现的呢？
