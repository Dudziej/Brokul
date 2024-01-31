import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/ProductsList.vue'
// import SalesReport from '../views/SalesReport.vue'

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
  // {
  //   path: '/sales-report',
  //   name: 'SalesReport',
  //   component: SalesReport
  // },
]

const router = new VueRouter({
  routes
})

export default router
