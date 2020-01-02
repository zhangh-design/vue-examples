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
