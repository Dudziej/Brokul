import Vue from 'vue'
import Vuex from 'vuex'
import products from './product.js'
import customers from './customer.js'
import orders from './order.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    customers,
    orders,
  }
})
