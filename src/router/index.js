import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { auth } from '@/main.js'
import { getAuth } from 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('@/views/RegistroView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/curso/:uid',
    name: 'editar-curso',
    component: () => import('@/views/EditarCursoView.vue'),
    meta: {
      requiresAuth: true
    },
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const loggedIn = auth.currentUser
  if (to.meta.requiresAuth && !loggedIn) {
    return next({name: 'login'})
  }
  if (to.name === 'login' && loggedIn) {
    return next({name: 'admin'})
  }
  next()
})

export default router
