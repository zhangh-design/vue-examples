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

那接下来是我们购物清单的这样一个组件，最开始的时候我们会判断`products`购物清单里面有没有产品，如果没有的话显示的是 请添加产品到购物车 ，那有的话我们依然是用`v-for`去输出去展示我们已经添加到购物车的一个数据，下面是我们的一个合计`total`这个`total`是通过我们的这样一个`mapGetters`
去获取到的第一个参数同样也是一个命名空间，这上面的三个`computed`计算属性啊我们这种写法它是`ES6`的一个扩展运算符那大家如果对`ES6`不是很熟悉的话这一块可以去补一下知识，它这样的一个写法其实等价于我下面注释的`computed`内的写法，那如果说你看着上面不是很好理解的话那结合着下面我注释的代码去理解会方便理解这样的一个事情。

那最后是我们的一个提交，提交的时候也是调用我们的这个`checkout`，那`checkout`是一个方法也是通过`dispatch`带有一个命名空间，那整个命名空间的话我们看它的形式是和我们的`url`的结构是有点类似的都是通过这样一个`/`的形式。


ShoppingCart.vue
```
<template>
  <div class="cart">
    <h2>清单</h2>
    <p v-show="!products.length"><i>请添加产品到购物车</i></p>
    <ul>
      <li
        v-for="product in products"
        :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>合计: {{ total }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">提交</button></p>
    <p v-show="checkoutStatus">提交 {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
    // ...mapGetters({
    //   products: 'cart/cartProducts',
    //   total: 'cart/cartTotalPrice'
    // })
  },
  // computed: {
  //   checkoutStatus(){
  //     return this.$store.state.cart.checkoutStatus
  //   },
  //   products() {
  //     return this.$store.getters['cart/cartProducts']
  //   },
  //   total() {
  //     return this.$store.getters['cart/cartTotalPrice']
  //   }
  // },
  methods: {
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
</script>

```

那我们看完了组件我们就去看我们的这个`store`：

那`store`我们的这个入口文件就是我们把我们的一个`cart`模块还有我们的`products`模块引入进来然后注册到我们的这个`modules`上面然后就可以了，这里我们还提供了一个根状态就是我们的`userInfo`那这块的话我们的用户信息啊一般都会存放在我们的一个根状态上面。


```
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {
      email: 'xxxxxx@qq.com'
    }
  },
  modules: {
    cart,
    products
  }
})

```

我们分别来看一下我们的模块，我们还是先看我们产品`products`这个模块，我们这里也是同时提供了我们的`state`、`getters`、`actions`、`mutations`，这里`export`导出模块的时候多了一个`namespaced`就是我们开启我们命名空间的一个属性你只要把这个置位`true`然后就开启了命名空间。

```
import shop from '../../api/shop'
import { PRODUCTS } from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(PRODUCTS.SET_PRODUCTS, products)
    })
  }
}

// mutations
const mutations = {
  [PRODUCTS.SET_PRODUCTS] (state, products) {
    state.all = products
  },

  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY] (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

```

我们分别看一下`state`里面有个`all`，`all`就是我们整个的一个产品的列表最开始初始是一个空数组，`actions`是`getAllProducts`这是获取我们的一个所有的产品我们通过这样的一个接口获取到产品之后我们通过`commit`的一个形式去调用我们的`mutations`然后去把我们的`state.all`重新赋值把我们的`products`赋值给我们的`all`，那这个接口啊`shop.getProducts`它比较简单这个它就是模拟了我们的`ajax`请求在这里面去做了一个`setTimeout`的一个延时去模拟我们的一个请求，那下面还有一个`buyProducts`购买产品的一个模拟接口那这里的话它有一个随机数就是我大于0.5的时候然后去调用我第一个`callback`，如果小于等于0.5的时候我们调用我们的这个`errorCb`这主要是为了模拟我们真实的一个环境，那`mutations`里面我们还有一个`DECREMENT_PRODUCT_INVENTORY`这个的话它是为了做我们的一个商品减一的一个操作，添加到购物车清单之后把我们的商品进行一个减一的操作。


shop.js
```
/**
 * Mocking client-server processing
 */
const _products = [
  { 'id': 1, 'title': '华为 Mate 20', 'price': 3999, 'inventory': 2 },
  { 'id': 2, 'title': '小米 9', 'price': 2999, 'inventory': 0 },
  { 'id': 3, 'title': 'OPPO R17', 'price': 2999, 'inventory': 5 }
]

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      Math.random() > 0.5
        ? cb()
        : errorCb()
    }, 100)
  }
}

```


那接下来使我们的`cart`模块，这个`cart`的话同样也是提供了我们一个`state`、`getters`、`actions`、`mutations`同样也是开启了我们的命名空间，这个稍微复杂一些了，那我们的`getters`啊第一个就是获取我们已经添加到购物车的一个列表，第二个是我们计算添加到购物车的整个列表的一个总价格。

那`actions`的话第一个`checkout`是提交我们的结算就是提交我们的购物车，那这里面的话最开始我们是先把我们添加到购物车的一个数据进行了一个复制然后我们通过`commit`更改这个状态为`null`接着我们是把我们这个已经添加到购物车的把它置为空数组，开始去调用我们的一个接口那如果成功了购物车的状态置为`successful`，如果失败了然后就置为`failed`那如果说失败了我们还把我们之前备份的数据从新恢复我们的一个清单列表

那接下来是我们这个`addProductToCart`就是添加商品去我们购物车，最开始也是把我们的状态置为`null`，然后我们开始去通过我们传递过来的一个`product`去查找购物车里面是否已经添加过了这个同类商品那如果已经添加过了对它执行的是一个加1的操作，那如果是没有添加过我们执行的是我们一个`push`的操作就是在我们的购物车里面直接`push`一个新商品，那最后的话我们添加完之后还要对我们的这个商品列表`products`里面去进行一个减1的操作那这个地方我们就和其它的有点不同了你会看到我们这里有加了一个命名空间`products`那如果说我们要在`cart`这个模块中要调用其它模块的一个`mutations`的话那我们需要这种形式而且第三个参数我们要把这个`root`置为`true`，通过这样的话我们就可以调用到我们不同模块的这个`mutations`。

```
import shop from '../../api/shop'
import { CART, PRODUCTS } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit(CART.SET_CHECKOUT_STATUS, null)
    // empty cart
    commit(CART.SET_CART_ITEMS, { items: [] })
    shop.buyProducts(
      products,
      () => commit(CART.SET_CHECKOUT_STATUS, 'successful'),
      () => {
        commit(CART.SET_CHECKOUT_STATUS, 'failed')
        // rollback to the cart saved before sending the request
        commit(CART.SET_CART_ITEMS, { items: savedCartItems })
      }
    )
  },

  addProductToCart ({ state, commit }, product) {
    commit(CART.SET_CHECKOUT_STATUS, null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id })
      } else {
        commit(CART.INCREMENT_ITEM_QUANTITY, cartItem)
      }
      // remove 1 item from stock
      commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, { id: product.id }, { root: true })
    }
  }
}

// mutations
const mutations = {
  [CART.PUSH_PRODUCT_TO_CART] (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  [CART.INCREMENT_ITEM_QUANTITY] (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  [CART.SET_CART_ITEMS] (state, { items }) {
    state.items = items
  },

  [CART.SET_CHECKOUT_STATUS] (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

```


对这个就是我们整个的购物车列表，打开浏览器我们体验一下，现在我们可以添加购物车，添加完之后你会发现我清单里面已经多了一个华为的商品，我现在添加小米9现在是没有货的，添加一个OPPO，如果我在添加一个华为你会发现这个华为是直接 X2 的一个操作而不是直接`push`，那华为我们现在是只有两件商品那这时候现在它这个商品加入购物车的按钮是已经被置灰掉了你不能在点了，那这时候我们可以直接点提交按钮看到现在是提交失败那是因为我们刚才看到的是一个随机数，显然这个随机数是小于等于0.5的那我们就是走了我们一个`errorCb`的回调，我在点击一次这次随机数大于0.5了显示success了，成功之后我们购物车的一个清单被清空掉了。


#### 结语
好通过我们刚才的一个示例我们基本上对我们的一个`Vuex`它的一些推荐的写法包括我们的一个命名空间包括我们的一个`mapXxx`的一个系列有了一个进一步的认识，那这一块的还希望大家课后自己去多练习尤其是我们`mapXxx`的一个系列它的一个参数写法很多样化，这块还需要靠大家自己去看一下。


课后习题：

扩展购物车示例，提供单次添加 1-N 的数量到购车车的功能。
