<template>
  <div>
    <el-container>
      <el-aside width="60%" style="min-height: 854px;position: relative">
        <img src="../assets/loginBackground.png" alt="loginBackground" width="100%"
             style="position: absolute;margin-top: -175px;top: 50%">
      </el-aside>
      <el-main class="register-main"
               style="margin:auto 10%;width: 20%;height:80%;vertical-align: center">
        <h1 style="color: #409EFF;text-align: center">注册</h1>
        <el-form ref="loginForm" :model="user" label-width="20%">
          <el-form-item label="姓名" required>
            <el-input v-model="user.name" type="text" autocomplete="off" placeholder="请输入姓名" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" required>
            <el-input v-model="user.email" type="email" autocomplete="off" placeholder="请输入邮箱" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input v-model="user.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="user.tel" type="tel" autocomplete="off" placeholder="请输入电话" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button type="primary" @click="onRegister" style="margin-left: 20%">注册</el-button>
            <el-button type="primary" @click="clearForm" style="float: right;margin-right: 20%">清空</el-button>
            <div class="clearBox"></div>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        tel: ""
      },
    }
  },
  created() {
    if(this.$route.params.isReload == 'true'){
      this.$router.go(0);
    }
  },
  methods: {
    onRegister: function () {
      const _this = this
      this.$axios.post(
          '/register',
          _this.user,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code == '0') {
          _this.$message({
            message: '注册成功！',
            type: 'success'
          });
          _this.$router.push({name: "Login", params: {msg: '注册成功！'}});
        } else {
          _this.$message.error(response.data.msg);
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
    clearForm: function () {
      this.user.name = "";
      this.user.email = "";
      this.user.password = "";
      this.user.tel = "";
    }
  }
}
</script>

<style scoped>
.register-main {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.clearBox {
  clear: both;
}
</style>
