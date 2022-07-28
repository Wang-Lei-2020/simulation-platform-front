<template>
  <div>
    <div class="login_form">
      <el-container>
        <el-aside width="60%" style="min-height: 854px;position: relative">
          <img src="../assets/loginBackground.png" alt="loginBackground" width="100%"
               style="position: absolute;margin-top: -175px;top: 50%">
        </el-aside>
        <el-main class="login-main"
                 style="margin:auto 10% ;width: 20%;height: 80%;vertical-align: center">
          <h1 style="color: #409EFF;text-align: center">登录</h1>
          <el-form ref="loginForm" :model="loginForm" label-width="20%">
            <el-form-item label="邮箱" required>
              <el-input v-model="loginForm.email" type="email" autocomplete="off" placeholder="请输入邮箱" clearable
                        size="medium" style="width: 90%"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                        size="medium" style="width: 90%"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button type="primary" @click="onLogin" style="margin-left: 20%">登录</el-button>
              <el-button type="primary" @click="toRegister" style="float: right;margin-right: 20%">注册</el-button>
              <div class="clearBox"></div>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {},
      loginForm: {
        email: "",
        password: ""
      },
    }
  },
  created() {
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
  },
  methods: {
    onLogin: function () {
      const _this = this
      let formData = new FormData();
      formData.append('email', _this.loginForm.email);
      formData.append('password', _this.loginForm.password);
      this.$axios.post('/user/login', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code == '0') {
          _this.user = response.data.data;
          localStorage.setItem('username', response.data.data.name);
          localStorage.setItem('role', response.data.data.role);
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
      console.log(this.$route.path);
      if (this.$route.path !== "/register") {
        this.$router.push("/register");
      }
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
