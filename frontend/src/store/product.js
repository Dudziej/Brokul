import axios from 'axios';

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
                const response = await axios.get('http://localhost:3000/products');
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
};
