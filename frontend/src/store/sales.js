import axios from 'axios';

const state = {
  salesData: [],
};

const actions = {
  async fetchSalesData({ commit }, { startDate, endDate } = {}) {
    let url = 'http://localhost:3000/sales';
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    
    try {
      const response = await axios.get(url);
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
