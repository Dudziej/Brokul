import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/ProductsList.vue';
import SalesReport from '../views/SalesReport.vue';
import OrderForm from '../views/OrderForm.vue';
import AdminPanel from '../views/AdminPanel.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: AdminPanel
  },
  {
    path: '/sales-report',
    name: 'SalesReport',
    component: SalesReport
  },
    {
    path: '/order-form',
    name: 'OrderForm',
    component: OrderForm
  },
]

const router = new VueRouter({
  routes
})

export default router
