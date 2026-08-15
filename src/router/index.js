import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import PreferencesView from '@/views/PreferencesView.vue'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/lugar/:id',
    name: 'detalle',
    component: PlaceDetailView,
    props: true
  },
  {
    path: '/inicio',
    redirect: '/'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
