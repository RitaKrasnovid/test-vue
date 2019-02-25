import shop from '../../api/shop'

export default {
  state: {
    products: []
  },

  getters: {
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  mitations: {
    setProducts (state, playload) {
      state.products = playload
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  },

  actions: {
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  }
}
