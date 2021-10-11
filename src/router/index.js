import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import login from '@/views/login.vue'
import test from '@/views/test.vue';
import mainPage from '@/views/mainPage.vue';
import register from "../views/register";
import game from "@/views/game.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'App',
        component: App,
        redirect: '/mainPage',
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
            }, {
                path: 'game',
                name: 'game',
                component: game
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// Â·ÓÉÊØÎÀ
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
