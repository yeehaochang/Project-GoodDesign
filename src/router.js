import Vue from 'vue';
import Router from 'vue-router';

import CustomBoard from '../src/views/CustomBoard.vue';
import Home from '../src/views/Home.vue';
import Products from '../src/views/Products.vue';
import Magazine from '../src/views/Magazine.vue';
import ProductPage from '../src/views/ProductPage.vue';
import CheckoutBoard from '../src/views/CheckoutBoard.vue';
import Cart from '../src/views/Cart.vue';
import Checkout1 from '../src/views/Checkout-1.vue';
import Checkout2 from '../src/views/Checkout-2.vue';
import ImageWall from '../src/views/ImageWall.vue';
// 後台
import Dashboard from '../src/views/Dashboard.vue';
import BackProducts from '../src/views/Back-Products.vue';
import BackCoupons from '../src/views/Back-Coupons.vue';
import BackOrders from '../src/views/Back-Orders.vue';
// 組件



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '*',
      redirect: 'Home',
    },
    {
      path: '/',
      name: 'Customboard',
      component: CustomBoard,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/products',
          name: 'Products',
          component: Products,
        },
        {
          path: '/magazine',
          name: 'Magazine',
          component: Magazine,
        },
        {
          path: '/productpage',
          name: 'ProductPage',
          component: ProductPage,
        },
        {
          path: '/imagewall',
          name: 'ImageWall',
          component: ImageWall,
        },
      ]
    },
    {
      path: '/checkoutboard',
      name: 'CheckoutBoard',
      component: CheckoutBoard,
      children: [
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: '/checkout-1',
          name: 'Checkout-1',
          component: Checkout1,
        },
        {
          path: '/checkout-2/:orderId',
          name: 'Checkout-2',
          component: Checkout2,
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/backproducts',
          name: 'BackProducts',
          component: BackProducts,
          meta: { requiresAuth: true }
        },
        {
          path: '/backcoupons',
          name: 'BackCoupons',
          component: BackCoupons,
          meta: { requiresAuth: true }
        },
        {
          path: '/backorders',
          name: 'BackOrders',
          component: BackOrders,
          meta: { requiresAuth: true }
        },
      ]
    }
  ]
})