import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import Register from "@/components/Register";
import UserList from "@/components/UserList";
import UserInfo from "@/components/UserInfo";
import SceneView from "@/components/SceneView";
import Experiment from "@/components/Experiment";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
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
        path: '/userList',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        component: UserInfo
    },
    {
        path: '/sceneView',
        name: 'SceneView',
        component: SceneView
    },
    {
        path: '/experiment',
        name: 'Experiment',
        component: Experiment
    }
];

const router = new VueRouter({
    mode: 'history',//去掉URL中的#
    // base: process.env.BASE_URL,
    routes: routes
})



export default router
