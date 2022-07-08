import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
//Views
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/Auth/SignupView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import Dashboard from '../views/Stocks/DashBoard'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user/:_id/dashboard',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    name: 'dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  store.dispatch("setError", '');
  store.dispatch("setMsg", '')
})

export default router
