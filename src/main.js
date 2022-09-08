import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "@/router";
import VueSession from 'vue-session'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Table, TableColumn, Pagination } from 'element-ui'
import dataV from '@jiaminghi/data-view';
// 引入全局css
// import './assets/scss/style.scss';
/// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
//引入echart
//4.x 引用方式
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(ElementUI);
Vue.use(VueSession);
Vue.use(VueAxios, axios);
// Vue.use(router)
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8081'
Vue.prototype.$axios = axios
///////////////////////////////

Vue.config.productionTip = false

new Vue({
    router,
    axios,
    store,
    render: h => h(App),
}).$mount('#app')


//路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (JSON.parse(Vue.$cookies.get('islogin'))) { //判断本地是否存在access_token
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath === "/login") {
        // if (JSON.parse(localStorage.getItem('islogin'))) {
        if (JSON.parse(Vue.$cookies.get('islogin'))) {

            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
});

