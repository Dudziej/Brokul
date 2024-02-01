import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/product.js';
import customers from './modules/customer.js';
import orders from './modules/order.js';
import sales from './modules/sales.js';

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
    sales,
  }
})
