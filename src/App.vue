<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <!--                <button v-on:click="testsession">测试session</button>-->
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1" style="margin-left: 4%" v-on:click="toHome">
            <img style="height: 56px;margin-right: 8%" src="./assets/logo.png" alt="logo">无用书城
          </el-menu-item>
          <el-menu-item index="2" style="margin-left: 4%" v-on:click="toHome">主页</el-menu-item>
          <el-submenu index="3" style="float: right;padding-right: 4%">
            <template slot="title">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              {{getUsername}}
            </template>
            <el-menu-item index="3-1" v-if="!getLoginState"  v-on:click="toLogin">登录</el-menu-item>
            <el-menu-item index="3-2" v-if="getLoginState"  v-on:click="onLogout">登出</el-menu-item>
            <el-menu-item index="3-3" v-on:click="toRegister">注册</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
        <el-backtop></el-backtop>
        <div style="text-align: center;color:#5a5959;margin-top: 35px">版权所有© 胡江浩、陈庆洋、宋廷泽</div>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
    }
  },
  computed: {
    // 计算属性的 getter
    getUsername: function () {
      // `this` 指向 vm 实例
      if(localStorage.getItem('username') == null){
        return "未登录";
      }else{
        return localStorage.getItem('username');
      }
    },
    getLoginState: function (){
      if(localStorage.getItem('username') == null){
        return false;
      }else{
        return true;
      }
    }
  },
  methods: {
    testsession: function () {
      this.axios.get('/login/test').then((response) => {
        this.msg = response.data;
      }).catch((response) => {
        console.log(response);
      })
    },
    toHome: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
      }
    },
    toLogin: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
      }
    },
    onLogout: function () {
      // if (this.$route.path !== "/login") {
      //   this.$router.push({name:"Login",params:{isReload: 'true'}});
      // }
      const _this = this;
      this.$axios.post('/user/logout',{},{
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if(response.data.code == '503'){
          _this.$message({
            message: '您未登录！',
            type: 'success'
          });
        }else{
          if(response.data.code == '0'){
            let flag = false;
            _this.$store.commit('login', flag);
            localStorage.clear();
            console.log(_this.$route.path);
            _this.$message({
              message: '登出成功！',
              type: 'success'
            });
            _this.$router.go(0);
          }
        }

      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    toRegister: function () {
      let flag = false;
      this.$store.commit('login', flag);
      localStorage.clear();
      console.log(this.$route.path);
      if (this.$route.path !== "/register") {
        this.$router.push({name:"Register",params:{isReload: 'true'}});
      }
    },

  }
}
</script>

<style scoped>
.header, .footer, .main {
  padding: 0;
}

.main {
  min-height: calc(100vh - 121px)
}
</style>
