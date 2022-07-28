import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import Login from "@/components/Login";
import Register from "@/components/Register";
import Content from "@/components/Content";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/content',
        name: 'Content',
        component: Content,
        meta:{requireAuth:true}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
];

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: routes
})



export default router