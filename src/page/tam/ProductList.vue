<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price  }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addToCart(product)">
        Add to cart2018
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    console.log('prod-list-created')
    this.$store.dispatch('getAllProducts')
  }
}
</script>
