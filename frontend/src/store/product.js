import axios from 'axios';

const baseURL = 'http://localhost:3000';

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${baseURL}/products`);
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async addProduct({ dispatch }, productData) {
      try {
        await axios.post(`${baseURL}/products`, productData);
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
  },
};
