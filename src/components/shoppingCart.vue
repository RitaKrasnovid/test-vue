<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}</li>
    </ul>
    <p>{{ total | currency}}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'cartProduct',
      total: 'cartTotal'
    }),

    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })
  },

  methods: {
    ...mapActions(['checkout'])
  }
}
</script>

<style>

</style>
