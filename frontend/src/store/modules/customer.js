import axios from 'axios';

const baseURL = 'http://localhost:3000';

const state = {
  customers: [],
};

const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
};

const actions = {
  async fetchCustomers({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/customers`);
      commit('SET_CUSTOMERS', response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  },
  async addCustomer({ dispatch }, customerData) {
    try {
      await axios.post(`${baseURL}/customers`, customerData);
      dispatch('fetchCustomers');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  },
};

const getters = {
  customers: state => state.customers,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
