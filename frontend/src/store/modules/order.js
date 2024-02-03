import axios from 'axios';

const baseURL = 'http://localhost:3000';

const state = {
  orders: [],
};

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
};

const actions = {
  async fetchOrders({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/orders`);
      commit('SET_ORDERS', response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  async addOrder({ dispatch }, orderData) {
    try {
      await axios.post(`${baseURL}/orders`, orderData);
      dispatch('fetchOrders');
    } catch (error) {
      console.error('Error adding order:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
