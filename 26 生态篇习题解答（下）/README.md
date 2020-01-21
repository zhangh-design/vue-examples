## 生态篇习题解答（下）

那接下来是我们的第三个题目，那就是扩展我们的购物车示例提供单次添加 1-N 的数量到购物车的功能。

#### 3. 扩展购物车示例，提供单次添加 1-N 的数量到购物车的功能。

- vuex-demo4

（详细代码请看 v-demo）

那我们直接打开我们的浏览器看一下我们最终的一个效果：

就是我们这里添加了一个数量的控件，我们在这个数量里面可以选择一次添加两个，那我们下面的清单里面就同时出现了两个。

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa33cVX8nvA6znJYq74J5hGmB5rlyijMyrkX1XcTUEmpyDkTHwJXDHDrpWEbiZM75wuP9rms90XOseVJlE84.1Bw!/b&bo=qgHzAQAAAAARB2k!&rf=viewer_4&t=5)

那我们看一下我们的代码：

main.js

```
import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

```

APP.vue

```
<template>
  <div id="app">
    <h1>购物车示例</h1>
    <p>账号: {{email}}</p>
    <hr>
    <h2>产品</h2>
    <ProductList/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
export default {
  computed: mapState({
    email: state => state.userInfo.email
  }),
  components: { ProductList, ShoppingCart }
}
</script>

```

ProductList.vue

那第一个就是我们提供了一个数量的控件，然后`select`通过`v-model`的形式来去获取来去保存我们的这个商品的我们选择的一个数量值，接下来是我们的这个`watch`监听器那这个的话主要是我们用我们这一个把所有的这个商品都放在了这样的一个组件里面那我们这里用的是一个`v-for`循环那我们通过`v-model`来控制了多个的这样的一个数量选择那我们不可能通过一个变量来去控制我们这样的所有的一个商品，我们这里就用到了`watch`的一个功能，那我们`watch`了这样的一个商品的时候，当我们商品变化的时候我们把这个`numbers`下面通过这个`product.id`来去保存了我们多个商品的这样的一个数据使它成为一个响应式的一个数据通过这个`this.$set()`这个方式，那这个`immediate: true`的意思呢它这个意思是我们添加这个为`true`后然后啊这个回调将会在监听开始的时候就会调用就是不会说等到我们这个`products`变化的时候才去调用那这里添加这一个在我们现在这个场景中似乎显得并不是那么的需要，好那实际上如果说我们真实的开发中的话那这里还是需要它的，因为说我们的这个商品啊那有可能在我们这个组件渲染完之前就已经有了这个`products`了那这时候我们想要去把这里面的`numbers`里面每一个`product.id`都把它变成响应式的那我们就必须加上这样的一个值`immediate: true`才可以，那接下来这里是我们有一个我们的`methods`我们之前都是通过这个`methods`我们现在是使用这样的在`dispatch`的时候我们把这个除了商品`product`传递`dispatch`数据之外我们还把这个`number`商品选择的数量然后也要传递出去现在就可以把它置为`1`了，这就是我们组件所做的一个改动。

```
<div>
    数量：
    <select v-model="numbers[product.id]">
      <option v-for="n in product.inventory" :key="n" :value="n">{{n}}</option>
    </select>
</div>

watch: {
    // 添加 immediate:true 后该回调将会在侦听开始之后被立即调用
    products: {
      handler: function (val) {
        val.forEach(product => {
          if (this.numbers[product.id] === undefined) {
            this.$set(this.numbers, product.id, 1)
          }
        });
      },
      immediate: true
    }
}
methods: {
    addProductToCart (product) {
      this.$store.dispatch(
        'cart/addProductToCart',
        { product, number: this.numbers[product.id] }
      )
      this.numbers[product.id] = 1
    }
}
```

cart.js

那我们看一下购物车所作的一个改动，那我们上面我们`dispatch`的时候传递过来的不仅仅有我们的`product`它传递的是一个对象`{product,number}`这个对象里面是`product`和`number`现在是这两个值，那我们后面要做的还是要把这个`product`分别都传递给了我们这个`mutations`同样都是都是加了一个`number`除了`id`之外加了一个`number`，然后我们去`mutations`里面也同样是加了`number`然后我们的这个数量不在是`1`了而是`number`的一个数量，我们`++`的时候也不是在`+1`了也是加的是`number`同样也是做这些的一个改动。

```
// actions
const actions = {
    addProductToCart ({ state, commit }, { product, number }) {
        commit(CART.SET_CHECKOUT_STATUS, null)
        if (product.inventory > 0) {
          const cartItem = state.items.find(item => item.id === product.id)
          if (!cartItem) {
            commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id, number })
          } else {
            commit(CART.INCREMENT_ITEM_QUANTITY, { cartItem, number })
          }
          // remove number item from stock
          commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, { id: product.id, number }, { root: true })
        }
  }
}
// mutations
const mutations = {
    [CART.PUSH_PRODUCT_TO_CART] (state, { id, number }) {
    state.items.push({
      id,
      quantity: number
    })
  },
  [CART.INCREMENT_ITEM_QUANTITY] (state, { cartItem: { id }, number }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity += number
  },
  // ...
}
```

products.js

那我们商品的列表同样也是，它做的是不在是`--`减减的操作了而是这样的一个`-number`的操作。


```
// mutations
const mutations = {

  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY] (state, { id, number }) {
    const product = state.all.find(product => product.id === id)
    product.inventory -= number
  }
}
```


对我们经过这样的一个简单的一个改动然后就完成了我们这样的一个数量选择然后添加购物车的功能，但是这个购物车仅供我们学习使用里面会有一些边界值可能没有充分的测试大家不要直接用在生产环境中而且这样的一个购物车的功能基本上不会去使用`Vuex`来去书写我们的购物车的一个功能。


#### 4. 我们第四个题目就是我们`SPA`的缺点有哪些，如何解决的：

SPA的缺点有哪些，如何解决？

- SEO
- 首屏渲染时间

就是我们前面讲解同构的时候已经讲过了一个是不利于我们的`SEO`一个是我们的首屏渲染时间长那解决方案的话一个是`预渲染`那还有一个是`SSR`。

#### 5. 对于动态内容，如果不是用 SSR ，如何做 SEO。

- 使用无头浏览器（phantomjs、headlessChrome）

那第五个题目呢就是说我们除了我们刚才说的`SSR`来去做我们的一个`SEO`，除了这个之外我们还有没有其它的一个方案那这里我提供了一个方案：就是使用我们的一个`无头浏览器`，其实所谓的无头浏览器就是说它是一个没有图形界面的一个浏览器它的所有的内容啊都是你看不到的所以说它叫无头浏览器，它的一个方式啊解决的一个方式啊就是说我们知道搜索引擎抓取我们页面的时候我们是可以拿到这样的一个`user-agent`的然后我们能够判断出哪些是真实用户哪些是爬虫，那如果说是搜索引擎爬虫的访问那我们可以走我们的无头浏览器然后渲染出我们的数据之后返回给我们的搜索引擎，那这样的话然后我们就间接的达到了我们的`SEO`的这样的一个方案，这种方式啊其实也是可以拿来做我们的这样一个同构的`SSR`的，但是效率太低而且占用内存多所以说真实的我们使用的时候不会去使用这样的一个方式去做我们的同构，当然这也是一个开放性的问题那我这边啊仅仅提供这样一个方案。
