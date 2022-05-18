import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import login from '@/views/login.vue'
import mainPage from '@/views/home.vue';
import register from "../views/register";
import {get_user_status} from "@/api/user.js"
import store from "../store/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect:'/mainPage',
    children: [
      {
        path: 'login',
        name: 'login',
        component: login
      },
      {
        path: 'mainPage',
        name: 'mainPage',
        component: mainPage
      },
      {
        path: 'register',
        name: 'register',
        component: register
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async function (to, from, next) {
  let res = await get_user_status()
  const isLoss = res == null
  console.log(isLoss)
  if (isLoss && store.getters.TokenStored!=='') {
    store.commit('logout')
  }
  next()
});


export default router
