## Vuex最佳实践

> 前言：这节课我们来讲一下`Vuex`的一个最佳实践那这里的最佳实践的话并不是说我们去二次封装一个轮子而是我们直接使用`Vuex`的一个比较推荐的写法那对于接触`Vue`不久的同学的话我也不要建议你去使用这些二次封装的一个轮子而且目前的话据我所知也没有一些比较知名的这样的二次封装的轮子那我们就老老实实使用我们的`Vuex`就好了。

那前面讲了我们的五个核心概念，对于前面四个的话我们使用的时候`Vuex`给我们提供了一个比较快捷的简写方式那就是我们的`mapXxx`系列的一个`api`，而且每个`api`它有不同的传参方式那这块也是让人比较郁闷的地方，那等会我会带着大家尽可能的过一遍但这块的写法它算是比较多最终还是得靠大家一个熟能生巧吧在理解的基础上还是要靠一个孰也即是多用。

#### 核心概念：
1. State    —— `this.$store.state.xxx`  —— mapState 取值
2. Getter   —— `this.$store.getters.xxx` —— mapGetters 取值
3. Mutation —— this.$store.commit("xxx") —— mapMutations 赋值
4. Action   —— this.$store.dispatch("xxx") —— mapActions 赋值
5. Module


那接着呢是我们使用我们的一个常量来代替我们的`Mutation`的一个事件类型这样我们可以把我们这些类型放在一个单独的文件里面对于我们一个团队的合作是非常有利的使用起来会非常的方便那尤其是在我们的`IDE`中让我们可以使用常量给我们带来一个很好提示那你不用担心这些我们单词拼写错误，对但这个并不是强制你去使用只是推荐。


使用常量替代 `Mutation` 事件类型

```
// mutation-types.js
export const SOME_MUTATION = "SOME_MUTATION"

```

```
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types.js'

const store = new Vuex.Store({
    state: { // ... },
    mutations: {
        // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
        [SOME_MUTATION] (state) {
            // mutate state
        }
    }
})
```

接下来就是我们的一个命名空间随着我们的项目越来越庞大然后我们会有很多的一个状态需要托管给我们的`Vuex`进行管理，我是建议对我们所有的模块都开启一个命名空间除了开启命名空间之外这个模块还支持嵌套的但是我建议大家不要把模块嵌套的太深尽量的偏平化一些，那我个人还是比较喜欢就这样一个一级的形式主要是跟我们的路由可以很好的一个配合，还有一个是灵活应用我们的`createNamespacedHelpers`它的作用的话就是它更多的是一个辅助函数我们在使用了我们的命名空间之后我们在我们的组件中然后通过我们的`mapXxx`系列进行派发事件的时候或者在`getXxx`值的时候那我们需要带上我们的命名空间那如果你不想在我们的`mapXxx`里面去都带上这个命名空间需要你要可能都写很多的字符那这时候你可以通过我们的这样的一个`辅助函数`来去帮助你生成一个`mapXxx`的一个系列就是说它和我们原生提供的不太一致它通过这个函数包装出来它本身里面是带有了一个命名空间的组织的这样我们就可以少些很多的一个代码。

Module
1. 开启命名空间 namespaced: true
2. 嵌套模块不要过深，尽量偏平化
3. 灵活应用 createNamespacedHelpers [资料](https://vuex.vuejs.org/zh/guide/modules.html#%E5%B8%A6%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E7%9A%84%E7%BB%91%E5%AE%9A%E5%87%BD%E6%95%B0)


那我们通过我们的一个示例来看一下我们这样的一个推荐的写法：

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa8j3qh8gNfdykt7tgGjDkoI5QdRF*nsozkzvv2YflcDNaa7CNlkBALGnm0C8x4CS*GYey0*4Aq3mKNZ11vsSv60!/b&bo=SgHqAQAAAAARB5A!&rf=viewer_4&t=5)

那我们这个实例的话就是我们的购物车的示例，我们看我们的浏览器最上面是我们的一个`title`，接下来是我们的账号就是我们登录之后我们的个人账号在接下来是我们的一个产品列表就是我们有什么产品现在我们是列了三个手机`华为`，`小米`，`OPPO`在最下面是我们的一个清单就是我们添加到购物车之后要显示的一个清单列表最下面是一个提交按钮当我们添加完之后我会提交给后台去购买。

我们看一下代码逻辑是怎么写的：

这个入口文件还是一样只是说我这个`store`它放在了一个独立的文件夹中去管理而不是在单独的一个文件里面了因为随着我们的状态越来越庞大单独的一个文件会变的越来越不好维护，那我们现在都放到了一个`store`的文件夹里面，那入口文件没有其它的一个特别之处了。


```
import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

我们接着看我们的`APP.vue`这个组件的话就是我们整个的根组件，那最开始就是我们的购物车示例的`title`那接着是我们的账号那账号的这个`email`信息就是通过我们的这个`mapState`然后去取的，`mapState`就是从我们的一个`state`里面
`userInfo.email`里面去取的这样一个`email`的信息，接下来是我们的一个产品清单这个是单独的一个组件。

```
<template>
  <div id="app">
    <div>
      <h1>购物车示例</h1>
      <p>账号: {{ email }}</p>
      <hr />
      <h2>产品</h2>
      <ProductList />
      <hr />
      <ShoppingCart />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
export default {
  components: {
    ProductList,
    ShoppingCart
  },
  computed: {
    ...mapState({
      email: state => state.userInfo.email
    }),
    count () {
      return this.$store.state.count
    }
  },
  data () {
    return {}
  }
}
</script>
<style></style>

```

我们分别来看一下这两个组件

第一个是我们的列表`ProductList.vue`就像我们在浏览器中看到的最开始就是通过我们的一个`v-for`一个`for`循环输出我们的这个产品`products`列表，那这个`products`也是通过这样的一个`state.products.all`这个等会我们从`store`里面去看一下我们的整一个结构你就可以明白我们为什么是这样一个写法了，我们除了我们现在的这种写法去使用`mapState`之外那如果你不使用`mapState`那你就要用我下面注释的`computed`计算属性代码那这一段代码上面的代码最终你可以认为它是一致的，但是这样写话我们会发现我们的代码会冗余这一个`state.products.all`还好如果多个的话我们使用`mapState`可以在`computed`计算属性中一个一个罗列下去，如果说你不用`mapState`的话那你就要写多个的计算属性了，那接着看回到我们的一个组件模板`{{ product.title }}`这里是我们产品的一个`title`产品的一个`price`就是我们前端页面显示的效果，接下来是我们的一个`button`那`button`的话它这个`disabled`是通过我们的这个`product`里面的有一个字段`inventory`就是它的一个余额，那如果说已经没有剩余量了那我们就把按钮置灰掉变成不可点的，我们点击事件的时候添加购物车的这样一个`Action`如果我们用`mapActions`的一个简写方法的话是这样子写的`methods: mapActions('cart', ['addProductToCart'])`那第一个参数是我们的一个命名空间，那如果说你不用简写方法的话那是我下面注释的这个方法大家也能看得到就是我们的`this.$store.dispatch('cart/addProductToCart', product)`这样的一个形式，最后有一个`created`我们组件的生命周期里面去`dispatch('products/getAllProducts')`获取我们所有的一个商品。

ProductList.vue
```
<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        加入购物车
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: mapState({
    products: state => state.products.all
  }),
  // computed: {
  //   products(){
  //     return this.$store.state.products.all
  //   }
  // },
  methods: mapActions('cart', [
    'addProductToCart'
  ]),
  // methods: {
  //   addProductToCart(product){
  //     this.$store.dispatch('cart/addProductToCart', product)
  //   }
  // },
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>

```

那接下来是我们购物清单的这样一个组件

ShoppingCart.vue
```

```




