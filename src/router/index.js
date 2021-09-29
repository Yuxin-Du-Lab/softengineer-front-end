import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import login from '@/views/login.vue'
import test from '@/views/test.vue';
import mainPage from '@/views/mainPage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    // redirect:'/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: login
      },
      {
        path: 'test',
        name: 'test',
        component: test
      },
      {
        path: 'mainPage',
        name: 'mainPage',
        component: mainPage
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
