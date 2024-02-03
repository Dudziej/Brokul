import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import SalesReport from '@/views/SalesReport.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SalesReport.vue', () => {
    let store;
    let vuetify;
    let actions;

    beforeEach(() => {
        const getters = {
            'sales/salesData': () => [{ name: 'Product A', price: 10, soldQuantity: 5, totalSales: 50 }],
            'customers/customers': () => [{ _id: '1', name: 'Customer A' }],
        };

        actions = {
            'customers/fetchCustomers': jest.fn(),
            'sales/fetchSalesData': jest.fn(),
            'sales/resetSalesData': jest.fn(),
        };

        store = new Vuex.Store({
            modules: {
                customers: {
                    namespaced: true,
                    state: { customers: [{ _id: '1', name: 'Customer A' }] },
                    getters: {
                        customers: state => state.customers,
                    },
                },
                sales: {
                    namespaced: true,
                    state: { salesData: [{ name: 'Product A', price: 10, soldQuantity: 5, totalSales: 50 }] },
                    getters: {
                        salesData: state => state.salesData,
                    },
                },
            },
            actions
        });

        vuetify = new Vuetify();
    });

    it('renders correctly', () => {
        const wrapper = mount(SalesReport, {
            localVue,
            store,
            vuetify,
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('displays sales data correctly', () => {
        const wrapper = mount(SalesReport, { localVue, store, vuetify });
        expect(wrapper.text()).toContain('Product A');
        expect(wrapper.text()).toContain('10');
        expect(wrapper.text()).toContain('5');
        expect(wrapper.text()).toContain('50');
    });

    it('fetches customers data on mount', async () => {
        mount(SalesReport, { localVue, store, vuetify });
        await Vue.nextTick();
        
        expect(actions['customers/fetchCustomers']).toHaveBeenCalled();
    });

    it('refreshes data when refresh button is clicked', async () => {
        const wrapper = mount(SalesReport, { localVue, store, vuetify });
        await wrapper.find('[data-testid="reset-raport-button"]').trigger('click');

        expect(actions['sales/resetSalesData']).toHaveBeenCalledTimes(1);
    });

    it('fetches sales when generate report button is clicked', async () => {
        const wrapper = mount(SalesReport, { localVue, store, vuetify });
        await wrapper.find('[data-testid="generate-raport-button"]').trigger('click');

        expect(actions['sales/fetchSalesData']).toHaveBeenCalledTimes(1);
    });

});
