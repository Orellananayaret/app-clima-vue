import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import PreferencesView from '../views/PreferencesView.vue'

import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/favoritos',
      name: 'favorites',
      component: FavoritesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/preferencias',
      name: 'preferences',
      component: PreferencesView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})




router.beforeEach((to) => {
  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth
  )

  const isAuthenticated =
    store.getters['auth/isAuthenticated']

  if (requiresAuth && !isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})


export default router
