import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import(/* webpackChunkName: "about" */ './components/layout/Main.vue'),
      children: [{
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/comprehensive',
        name: 'comprehensive_index',
        component: () => import(/* webpackChunkName: "about" */ './views/comprehensive-index/ComprehensiveIndex.vue')
      },
      {
        path: '/comprehensive/detail/:id',
        name: 'comprehensive_index_detail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/comprehensive-index/comprehensive-index-detail/ComprehensiveIndexDetail.vue')
      },
      {
        path: '/price',
        name: 'price_index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/price-index/PriceIndex.vue')
      },
      {
        path: '/price/detail/:id',
        name: 'price_index_detail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/price-index/PriceIndexDetail/PriceIndexDetail.vue')
      },
      {
        path: '/widget',
        name: 'widget',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/widget/Widget.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/about/About.vue')
      },
      {
        path: '/statement',
        name: 'statement',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/content/Statement.vue')
      }
      ]
    },
    {
      path: '/widget/index',
      name: 'statement',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/widget/WidgetFrame.vue')
    }
  ]
})
