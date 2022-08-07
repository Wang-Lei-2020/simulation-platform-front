<template>
  <div id="app">
    <div v-if="photoFlag">
      <el-dialog
          title="修改头像"
          :visible.sync="photoFlag"
          width="40%">
        <ChangePhoto></ChangePhoto>
      </el-dialog>
    </div>

    <el-container>
      <el-header class="header">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            background-color="#2F4F4F"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1" style="margin-left: 4%">
            <img style="height: 56px;margin-right: 8%" src="./assets/1.png" alt="logo">川藏铁路虚拟仿真教学系统
          </el-menu-item>
          <el-submenu index="2" style="float: right;padding-right: 4%">
            <template slot="title">
              <el-avatar :src="getPhotoUrl"></el-avatar>
              {{getUsername}}
            </template>
            <el-menu-item index="3-1" v-if="getLoginState" v-on:click="ChangePhoto">修改头像</el-menu-item>
            <el-menu-item index="3-2" v-if="!getLoginState"  v-on:click="toLogin">登录</el-menu-item>
            <el-menu-item index="3-3" v-if="getLoginState"  v-on:click="onLogout">注销</el-menu-item>
            <el-menu-item index="3-4" v-if="!getLoginState" v-on:click="toRegister">注册</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

        <el-main v-if="getLoginState" class="main">
          <el-col span="4">
            <el-row class="tac">
              <el-menu
                  :default-active="this.activePath"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
              >
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>系统设置</span>
                  </template>
                  <el-menu-item v-if="getRole" class="submenu" index="4-1" @click="toUserList();saveNavState('4-1')">  系统用户</el-menu-item>
                  <el-menu-item class="submenu" index="4-2" @click="toUserInfo();saveNavState('4-2')">  个人信息</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>虚拟仿真实验</span>
                  </template>
                  <el-menu-item class="submenu" index="5-1" @click="toSceneView();saveNavState('5-1')">全景浏览</el-menu-item>
                  <el-menu-item class="submenu" index="5-2" @click="toExperiment();saveNavState('5-2')">传感器安放</el-menu-item>
                </el-submenu>

                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>教学管理</span>
                  </template>
                  <el-menu-item class="submenu" index="6-1" @click="toCourseManagement();saveNavState('6-1')">课程管理</el-menu-item>
                  <el-menu-item v-if="!isTeacher" class="submenu" index="6-2" @click="toMyCourse();saveNavState('6-2')">我的课程</el-menu-item>
                  <el-menu-item class="submenu" index="6-3" @click="toDataManagement()">实验教学</el-menu-item>
                  <el-menu-item class="submenu" index="6-4" @click="toDataManagement()">实验考核</el-menu-item>
                  <el-menu-item class="submenu" index="6-5" @click="toDataManagement()">实验成绩</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-row>
          </el-col>
          <el-col v-if="getLoginState" span="20">
            <router-view></router-view>
          </el-col>
        </el-main>
        <el-main v-if="!getLoginState" class="main">
          <router-view></router-view>
        </el-main>

      <el-footer class="footer">
        <el-backtop></el-backtop>
        <div style="text-align: center;color:#5a5959;margin-top: 35px">版权所有© WangLei</div>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import ChangePhoto from "@/components/ChangePhoto";

export default {
  name: "App",
  components:{ChangePhoto},
  data() {
    return {
      activeIndex: "1",
      photoFlag:false,
      activePath:"4-1"
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed: {
    // 计算属性的 getter
    getUsername: function () {
      if(localStorage.getItem('userName') == null){
        return "未登录";
      }else{
        return localStorage.getItem('userName');
      }
    },
    getLoginState: function (){
      return localStorage.getItem('userName') != null;
    },
    getPhotoUrl: function(){
      if(localStorage.getItem('logoImage') !== "null") {
        return localStorage.getItem('logoImage');
      }
      else{
        return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      }
    },
    getRole: function(){
      return localStorage.getItem('role') !== "student";
    },
    isTeacher: function(){
      return localStorage.getItem('role') === "teacher";
    },

  },
  methods: {
    toLogin: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
      }
    },
    onLogout: function () {
      const _this = this;
      this.$axios.post('/user/logout',{},{
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if(response.data.code === '503'){
          _this.$message({
            message: '您未登录！',
            type: 'success'
          });
        }else{
          if(response.data.code === '0'){
            let flag = false;
            _this.$store.commit('login', flag);
            localStorage.clear();
            console.log(_this.$route.path);
            _this.$message({
              message: '登出成功！',
              type: 'success'
            });
            _this.$router.push({name:"Login",params:{isReload: 'true',msg: '登出成功！'}});
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
    ChangePhoto: function(){
      this.photoFlag = true;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toUserList: function(){
      if (this.$route.path !== "/userList") {
        this.$router.push({name:"UserList",params:{isReload: 'true'}});
      }
    },
    toUserInfo: function(){
      if (this.$route.path !== "/userInfo") {
        this.$router.push({name:"UserInfo",params:{isReload: 'true'}});
      }
    },
    toSceneView: function () {
      if (this.$route.path !== "/sceneView") {
        this.$router.push({name:"SceneView",params:{isReload: 'true'}});
      }
    },
    toExperiment: function () {
      if (this.$route.path !== "/experiment") {
        this.$router.push({name:"Experiment",params:{isReload: 'true'}});
      }
    },
    toCourseManagement: function(){
      if (this.$route.path !== "/courseManagement") {
        this.$router.push({name:"CourseManagement",params:{isReload: 'true'}});
      }
    },
    toMyCourse: function(){
      if (this.$route.path !== "/myCourse") {
        this.$router.push({name:"MyCourse",params:{isReload: 'true'}});
      }
    },
    // 点击时，将子菜单的index存储在本地中，并使用在主菜单的default-active中，保持其状态
    saveNavState: function (activePath){
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
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
