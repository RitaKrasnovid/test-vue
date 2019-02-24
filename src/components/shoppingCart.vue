<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}</li>
    </ul>
    <p>{{ total | currency}}</p>
  </div>
</template>

<script>

export default {
  computed: {
    products () {
      return this.$store.getters.cartProduct
    },

    total () {
      return this.$store.getters.cartTotal
    }
  }
}
</script>

<style>

</style>
