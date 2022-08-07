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
        if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
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
        if (JSON.parse(localStorage.getItem('islogin'))) {
            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
});

