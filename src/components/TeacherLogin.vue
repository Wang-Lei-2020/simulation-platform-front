<template>
  <div>
    <div class="login_form">
      <el-container>
        <el-aside width="30%"></el-aside>
        <el-main class="login-main"
                 style="margin-top:100px;width: 200%;height: 80%;vertical-align: center">
          <h1 style="color: #409EFF;text-align: center">登录</h1>
          <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="20%">
            <el-form-item label="用户名" prop="userName" required>
              <el-input v-model="loginForm.userName" type="text" autocomplete="off" placeholder="请输入用户名" clearable
                        size="medium" style="width: 90%"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
              <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                        size="medium" style="width: 90%"></el-input>
            </el-form-item>
<!--            <el-form-item label="角色" prop="role" required>-->
<!--              <el-select v-model="loginForm.role" placeholder="请选择角色" style="width: 90%">-->
<!--                <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label-width="0">
              <el-button type="primary" @click="onLogin" style="margin-left: 20%;width:100px">登录</el-button>
              <el-button type="success" @click="toRegister" style="float: right;margin-right: 20%;width:100px">注册</el-button>
              <div class="clearBox"></div>
            </el-form-item>
          </el-form>
        </el-main>
        <el-aside width="30%"></el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      loginForm: {
        userName: '',
        password: '',
        role: 'teacher'
      },
      rules: { //prop的名字必须和uer中的名字一样！！！
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码'}
        ],
        role: [
          { required: true, message: '请选择角色'}
        ],
      },
      roleOptions: [{
        value: 'student',
        label: '学生'
      }, {
        value: 'teacher',
        label: '教师',
      }],
    }
  },
  created() {
    if(Vue.$cookies.get("role") === "student"){
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }

    if(Vue.$cookies.get("userName") !== null && Vue.$cookies.get("role") === "teacher") {
      this.$router.push({name: 'UserList', params: {isReload: 'true'}});
    }

    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
  },
  methods: {
    onLogin: function () {
      const _this = this

      let formData = new FormData();
      formData.append('userName', _this.loginForm.userName);
      formData.append('password', _this.loginForm.password);
      formData.append('role',_this.loginForm.role)
      this.$axios.post('/user/login', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code === '0') {

          Vue.$cookies.set("userName", _this.loginForm.userName, "1D");
          Vue.$cookies.set("userId", response.data.data.userId, "1D");
          Vue.$cookies.set("password", _this.loginForm.password, "1D");
          Vue.$cookies.set("realName", response.data.data.realName, "1D");
          Vue.$cookies.set("phone", response.data.data.phone, "1D");
          Vue.$cookies.set("email", response.data.data.email, "1D");
          Vue.$cookies.set("description", response.data.data.description, "1D");
          Vue.$cookies.set("sex", response.data.data.sex, "1D");
          Vue.$cookies.set("role", response.data.data.role, "1D");
          if(response.data.data.logoImage != null){
            Vue.$cookies.set("logoImage", response.data.data.logoImage, "1D");
          }else{
            Vue.$cookies.set("logoImage", "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png", "1D");
          }

          let flag = true;
          _this.$store.commit('login', flag);
          _this.$router.push({name: 'Home', params: {isReload: 'true'}});
        }else{
          _this.$message.error(response.data.msg);
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
    toRegister: function () {
      if (this.$route.path !== "/register") {
        this.$router.push("/register");
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
            let role = Vue.$cookies.get('role');

            const cookies = Vue.$cookies.keys();
            for (let i = 0; i < cookies.length; i++) {
              Vue.$cookies.remove(cookies[i])
            }

            console.log(_this.$route.path);
            _this.$message({
              message: '登出成功！',
              type: 'success'
            });
            if(role === 'student')
              _this.$router.push({name:"Login",params:{isReload: 'true',msg: '登出成功！'}});
            else
              _this.$router.push({name:"TeacherLogin",params:{isReload: 'true',msg: '登出成功！'}});
          }
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
  }
}
</script>

<style scoped>
.login-main {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.clearBox {
  clear: both;
}
</style>
