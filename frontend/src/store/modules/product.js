import axios from 'axios';

const baseURL = 'http://localhost:3000';

const state = {
  products: [],
};

const getters = {
  products: state => state.products,
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },

  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex(p => p._id === updatedProduct._id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },

  REMOVE_PRODUCT(state, productId) {
    state.products = state.products.filter(p => p._id !== productId);
  },
};

const actions = {
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

  async editProduct({ commit }, product) {
    try {
      const response = await axios.put(`${baseURL}/products/${product._id}`, product);
      commit('UPDATE_PRODUCT', response.data);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  },

  async deleteProduct({ commit }, productId) {
    try {
      await axios.delete(`${baseURL}/products/${productId}`);
      commit('REMOVE_PRODUCT', productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
