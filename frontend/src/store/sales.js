import axios from 'axios';

const state = {
  salesData: [],
};

const actions = {
  async fetchSalesData({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/sales');
      commit('SET_SALES_DATA', response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  },
};

const mutations = {
  SET_SALES_DATA(state, salesData) {
    state.salesData = salesData;
  },
};

const getters = {
  salesData: state => state.salesData,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
