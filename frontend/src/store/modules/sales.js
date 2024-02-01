import axios from 'axios';

const state = {
  salesData: [],
};

const actions = {
  async fetchSalesData({ commit }, { startDate, endDate, customerId } = {}) {
    const params = new URLSearchParams();

    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (customerId) params.append('customerId', customerId);

    try {
      const response = await axios.get(`http://localhost:3000/sales?${params.toString()}`);
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
