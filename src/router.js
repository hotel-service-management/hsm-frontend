import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Login from './views/Login.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        skipAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: {
        skipAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/profile/edit',
      name: 'profileEdit',
      component: () => import('./views/profile/Edit.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('./views/Booking.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking/create',
      name: 'create_booking',
      component: () => import('./views/booking/Create.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking/pay',
      name: 'pay_booking',
      component: () => import('./views/booking/Payment.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking/checkout/:id',
      name: 'bookingCheckout',
      props: true,
      component: () => import('./views/checkout/Summary.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking/receipt/:id',
      name: 'bookingReceipt',
      props: true,
      component: () => import('./views/booking/Receipt.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking/detail/:id',
      name: 'bookingDetail',
      props: true,
      component: () => import('./views/booking/Detail.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking/privilege/:id',
      name: 'privilege',
      props: true,
      component: () => import('./views/Privilege.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service',
      name: 'service',
      props: true,
      component: () => import('./views/ServiceList.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service/:id',
      name: 'serviceDetail',
      props: true,
      component: () => import('./views/Service.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('./views/Review.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/review/create/:id',
      name: 'create_review',
      props: true,
      component: () => import('./views/review/Create.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['user/isLoggedIn']) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.skipAuth)) {
    if (store.getters['user/isLoggedIn']) {
      next('/booking')
      return
    }
    next()
  } else {
    next()
  }
})

export default router
