## 生态篇习题解答（上）

> 前言：这节课开始是我们生态篇的一个习题解答部分。

那我们的第一个题目是我们的`Vuex是通过什么方式提供响应式数据的`，那这个的话我们在我们的前面的一个原理部分那已经讲解过了实际上是通过我们的`new Vue({})`的方式这个可以看我们前面的这个` 	min-vuex.js`的代码那如果说你想进一步的去学习的话那可以去阅读我们`Vuex`的一个源码。

### 1. Vuex 是通过什么方式提供响应式数据的？

- new Vue({})


那第二个题目是我们扩展我们之前写的一个`简化版的min-vuex 实现 getters，并实现 Vuex 的方式注入$store`这里面涉及到两个点：

第一个就是我们实现我们`getters`就是利用我们的计算属性`computed`来去实现的这样的一个`getters`缓存。

第二个`Vuex的方式注入$store`实际上是通过我们的这个`beforeCreate`中混入
$store 的获取方式，那这一块看一下我们这个`min-vuex`相较于之前我们的代码有哪些的改动。

### 2. 扩展简化版的 min-vuex ，实现 getters，并实现 Vuex 的方式注入$store。

- 计算属性 computed 实现 getters 缓存
- beforeCreate 中混入 $store 的获取方式

这个还是我们在我们之前讲`Vuex`的一个基础上来去进一步扩展的。

`main.js`的话把我们的这个`store`然后也注册到这个实例上面。

main.js

```
import Vue from 'vue'
import App from './App.vue'
import Vuex from './min-vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
})
// 上一个版本是通过原型挂载的方式定义的$store
// Vue.prototype.$store = store
new Vue({
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  render: h => h(App)
}).$mount('#app')

```

那这个`App.vue`的话实际上就是验证我们这个`getters`的一个功能`doubleCount`。

App.vue

```
<template>
  <div id="app">
    {{count}}
    {{$store.getters.doubleCount}}
    <button @click="$store.commit('increment')">count++</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'APP.vue'
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>
<style></style>

```

那具体就是看我们这个`min-vuex.js`它具体的一个改动了，先说我们的这个`getters`是如何实现我们这个缓存的？那实际上它就是借助了这样的一个`computed`对象，我们是把这个我们的`getters`里面的这些绑定的方法赋给了我们的这个`computed`上面然后我们把这个`computed`其实还是给了`this._vm`的这个`Vue`实例对象，那这时候我们去`store`这个`getter`的时候实际上是取的这样的一个`store._vm[key]`从这个`_vm`这下面去取的这个`computed`下面的这样的一个数据，还是借助了这个`Object.defineProperty`的这个`get`的一个功能，对这样就可以实现让我们这样的一个`get`的一个缓存的一个功能了，通过`this.$store`去获取的。

那我们之前的话是直接挂载到了我们的原型上面，现在的话我们是通过这样的一个`install`去提供了这样的一个功能，那这个的话为什么是`install`？这个是给这个我们前面提到的`Vue.use()`用的（这其实是一个规范，Vue在底层会就是去找这个`install`的这样一个方法，这个就没有为什么就是一个规范），对这边我们之前是用的这个原型现在是删掉了这里需要注意下

min-vuex.js

```
let Vue;
function install (_Vue) {
  Vue = _Vue;
  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      // 通过向父级查找的一个方式（类似冒泡）去获取这样的一个 $store 的。
      this.$store = options.parent.$store;
    }
  }
  // 全局混入
  // 它的一个功能其实就是说我现在注册了一个 beforeCreate的钩子，这个钩子在生成每个组件或实例时都会去先执行 vuexInit 这个方法。
  Vue.mixin({ beforeCreate: vuexInit });
}

const Store = function Store (options = {}) {
  const {state = {}, mutations={}, getters={}} = options
  const computed = {}
  const store = this
  store.getters = {};
  for (let [key, fn] of Object.entries(getters)) {
    computed[key] = function () { return fn(store.state, store.getters); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
    });
  }
  this._vm = new Vue({
    data: {
      $$state: state
    },
    computed,
  })
  this._mutations = mutations
}
Store.prototype.commit = function(type, payload){
  if(this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}
Object.defineProperties(Store.prototype, { 
  state: { 
    get: function(){
      return this._vm._data.$$state
    } 
  }
});
export default {Store, install}
```

对这就是我们这个`min-vuex`然后去做的这样一个`getter`还有我们`Vuex`的方式然后注入`$store`，其实这里面的这些代码其实都是从`Vuex`里面去拿出来的精简的大家有兴趣的话还是可以去看一下`Vuex`的它的一个源代码要比这些我们精简过后的复杂一些但是你应该还可以学到更多的东西。
