import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import Register from "@/components/Register";
import UserList from "@/components/UserList";
import UserInfo from "@/components/UserInfo";
import SceneView from "@/components/SceneView";
import Experiment from "@/components/Experiment";
import CourseManagement from "@/components/CourseManagement";
import MyCourse from "@/components/MyCourse";
import VueCookies from 'vue-cookies';
import CourseStudy from "@/components/CourseStudy";
import CodeCompile from "@/components/CodeCompile";
import TeacherRegister from "@/components/TeacherRegister"
import TeacherLogin from "@/components/TeacherLogin"
import CoursePractice from "@/components/CoursePractice";
import Home from "@/components/Home";
import View from "@/views/index"
import CourseSelect from "@/components/CourseSelect";

Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
        // component: () => import('../views/index.vue')
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
    },
    {
        path: '/courseManagement',
        name: 'CourseManagement',
        component: CourseManagement
    },
    {
        path: '/myCourse',
        name: 'MyCourse',
        component: MyCourse
    },
    {
        path: '/courseStudy',
        name: 'CourseStudy',
        component: CourseStudy
    },
    {
        path: "/codeCompile",
        name: 'CodeCompile',
        component: CodeCompile
    },
    {
        path: "/TeacherRegister",
        name: 'TeacherRegister',
        component: TeacherRegister
    },
    {
        path: "/TeacherLogin",
        name: 'TeacherLogin',
        component: TeacherLogin
    },
    {
        path: "/coursePractice",
        name: 'CoursePractice',
        component: CoursePractice
    },
    {
        path: "/view",
        name: 'View',
        component: View
    },
    {
        path: "/courseSelect",
        name: 'CourseSelect',
        component: CourseSelect
    }
];

const router = new VueRouter({
    mode: 'history',//去掉URL中的#
    // base: process.env.BASE_URL,
    routes: routes
})



export default router
