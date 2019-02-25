import shop from '../../api/shop'

export default {
  state: {
    cart: [],
    checkoutStatus: null
  },

  getters: {
    cartProduct (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal (state, getters) {
      return getters.cartProduct.reduce((total, product) => total + product.price * product.quantity, 0)
    }
  },

  mitations: {
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    setChackoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.cart = []
    }
  },

  actions: {
    addProductToCart ({state, getters, commit}, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },

    checkout ({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setChackoutStatus', 'success')
        },
        () => {
          commit('setChackoutStatus', 'fail')
        }
      )
    }
  }
}
