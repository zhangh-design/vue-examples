## Vuex核心概念及底层原理

> 前言：那这节课的话我们来讲一下这个 `vuex` 它的一个核心概念以及它的一个底层原理它是如何实现的。 

它的核心概念的话分为5个部分：

核心概念

1. State ——— this.$store.state.xxx 取值
2. Getter ——— this.$store.getters.xxx 取值
3. Mutation ——— this.$store.commit('xxx') 赋值
4. Action ——— this.$store.dispatch('xxx') 赋值
5. Module

第一个的话就是我们的 `state` 这个的话我们可以通过 `this.$store.state.xxx` 来取值，第二个是我们类似于我们的一个计算属性的一个功能它具有缓存的一个效果它也是用来取值的`getter`，第三个和第四个是用来赋值的一个是`commit`一个是`dispatch`，但是`dispatch`它并不能直接的修改值它最终还是要经过我们的一次`commit`，好最后一个的话是我们的`Module` 好就是我们的一个模块化把我们的状态进一步的做一个组织管理。


好那它的一个底层原理的话其实最核心的就是我们一个`State`了就是提供响应式的一个数据然后`Getter`借助`Vue`的计算属性来实现我们的缓存，接下来就是我们的一个`Mutation`就是更改我们 `state` 的方法，`Action`就是触发 `mutation` 方法，那`Module`的话它是属于我们大的一个状态树的我们通过动态添加的我们可以通过`Vue.set`来动态添加我们的一个数据到`state`中然后成为我们的一个响应式数据。

底层原理：
1. State：提供一个响应式数据
2. Getter：借助 Vue 的计算属性 computed 来实现缓存
3. Mutation：更改 state 方法
4. Action：触发 mutation 方法
5. Module：Vue.set 动态添加 state 到响应式数据中

那我们看一下它的一个组成的代码具体是怎么实现的：

我们还是用我们上节课写的计数器来去演示，我们自己去写一个非常小的`min-vuex`缩小版它能提供的功能肯定比较有限，但我们把它最核心的一个东西响应式数据来去提供给我们。

那我们看下我们的这个代码：

我们最开始其实就是我们的`Store`，`Store`里面我们是如何做到我们的响应式的
实际上它还是使用了`Vue`我们通过 `new Vue`来去把我们的`state`其实是放在了我们`Vue`的这个`data`下面这样的话我们的`state`就已经间接的变成了一个响应式的数据其实它的核心代码就是这么简单你可以认为最最核心的就是这五行代码然后接下来就是我们的一个`commit`，我们的`commit`就是我们的`Store`然后去进行改变数据的`Commit`的时候其实我们可以理解为其实就是在调用我们`mutations`上面的一个方法然后我们把我们的一个`state`值还有我们`commit`的时候传递的这个`payload`提供的额外的一个参数都可以传递过来那`Object.defineProperties`是干什么的呢？我们现在我们的响应式数据挂载到了`Vue`的这个实例下面这个`state`里面，那我们去访问的时候我们平时是在访问的是`this.$state`那我们如何去访问到`new Vue`实例里面的`$$state`数据呢那就是我们这个`Object.defineProperties`提供的这个功能这里面我们从写了它这个`get`值我们每次去`get`这个`state`的值的时候实际上是访问的这个`this._vm` ，`Vue`的实例下面的这个`data`里面的这个`state`的值。

min-vuex.js
```
import Vue from 'vue'
const Store = function Store (options = {}) {
  const {state = {}, mutations={}} = options
  this._vm = new Vue({
    data: {
      $$state: state
    }
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
      // 重写 get 取值方法
      return this._vm._data.$$state
    } 
  }
});
export default {Store}
```

那我们这个`min-vuex` 就24行代码但是它已经提供了我们一个响应式的`store`还有我们的一个`commit`，那我们把我们原来的上节课的一个计数器精简一下我们这个：

APP.vue
```
<template>
  {{ count }}
  <br />
  <button @click="$store.commit('increment')">count ++</button>
</template>
<script>
 export default {
    data(){
      return {}
    },
    computed: {
        count(){
            return this.$store.state.count
        }
    }
 }
</script>
```
那我们的`main.js`里面我们就不用`vuex`了我们用我们自己的

main.js
```
import Vuex from './min-vuex.js'

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
// 我们直接挂载到原型上
Vue.prototype.$store = store
new Vue({
  router,
  // store, 这里我们的 min-vuex 插件无法按照 Vuex 那样直接配置在这里
  render: h => h(App)
}).$mount('#app')
```
好完成了上面的设置后我们看一下我们浏览器的效果：

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMaxJ1NcFXvP80J9QyxyfMAR2XAl2MwC3UbKRs4izyZzOmul*X7dMIfaiuRWFL6y1weUg*l56CE6PumUl9uTq56sg!/b&bo=SQFnAAAAAAARBx8!&rf=viewer_4&t=5)

那我们点击 `count ++` 按钮发现我们依然完成了这样的一个`Vuex`的状态管理。


#### 结语：
那这就是我们这个`min-vuex`23行代码提供的一个简单的`Vuex`的一个功能那它还有很多复杂的功能大家有兴趣的话可以在这个基础上进一步的一个扩展。

那我们的这个课后 习题的话也就是去扩展我们简化版的`min-vuex`实现`getters`，并实现`vuex`的方式注入`$store`。
