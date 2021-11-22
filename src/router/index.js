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
        component: game
      },
      {
        path: 'friends',
        name: 'friends',
        component: friends
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// ·������
// router.beforeEach((to, from, next) => {
//
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
//
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

export default router
