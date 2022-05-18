import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import login from '@/views/login.vue'
import test from '@/views/test.vue';
import mainPage from '@/views/mainPage.vue';
import register from "../views/register";
import userData from "../views/userData";
import wareHouse from "../views/wareHouse";
import userServe from "../views/userServe";
import game from "@/views/game.vue";
import friends from "../views/friends";
// import {getUserInfo} from "@/api/user.js"
import {get_user_status} from "@/api/user.js"
import store from "../store/store";
import workshop from "../views/workshop";

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
        path: 'test',
        name: 'test',
        component: test
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
      },
      {
        path: 'userData',
        name: 'userData',
        component: userData
      },
      {
        path: 'wareHouse',
        name: 'wareHouse',
        component: wareHouse
      },
      {
        path: 'userServe',
        name: 'userServe',
        component: userServe
      },
      {
        path: 'game',
        name: 'game',
        component: game,
      },
      {
        path: 'friends',
        name: 'friends',
        component: friends
      },
      {
        path: 'workshop',
        name: 'workshop',
        component: workshop
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
