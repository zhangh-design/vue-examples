<template>
  <div id="app">
    <unicom-index v-if="false"></unicom-index>
    <div v-if="false">
      <h1>购物车示例</h1>
      <p>账号: {{ email }}</p>
      <hr />
      <h2>产品</h2>
      <ProductList />
      <hr />
      <ShoppingCart />
    </div>
    <h2>router demo</h2>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import unicomIndex from './components/test/Index.vue'
export default {
  life: {
    prepose () {
      console.info('前置触发函数');
    },
    user ({ data }) {
      console.info('ddddddddddd ', data);
    }
  },
  components: {
    ProductList,
    ShoppingCart,
    unicomIndex
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
