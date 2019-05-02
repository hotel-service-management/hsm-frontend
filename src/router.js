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
      component: () => import('./views/Register.vue')
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
      path: '/privilege',
      name: 'privilege',
      component: () => import('./views/Privilege.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service',
      name: 'service',
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
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
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
      next('/dashboard')
      return
    }
    next()
  } else {
    next()
  }
})

export default router
