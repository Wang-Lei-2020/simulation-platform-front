<template>
  <div>
    <el-container>
      <el-aside width="30%"></el-aside>
      <el-main class="register-main"
               style="margin-top: 50px;margin-bottom: 20px;width: 200px;height:100%;vertical-align: center">
        <h1 style="color: #409EFF;text-align: center">注册</h1>

        <el-form :model="user" :rules="rules" label-width="20%">
          <el-form-item label="用户名" prop="userName" required>
            <el-input v-model="user.userName" type="text" autocomplete="off" placeholder="请输入用户名" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName" required>
            <el-input v-model="user.realName" type="text" autocomplete="off" placeholder="请输入真实姓名" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="性别" required>
            <el-select v-model="sex" placeholder="请选择性别" style="width: 90%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" required>
            <el-input v-model="user.email" type="email" autocomplete="off" placeholder="请输入邮箱" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>

          <el-form-item label="电话" prop="phone" required>
            <el-input v-model="user.phone" type="tel" autocomplete="off" placeholder="请输入电话" clearable
                      size="medium" style="width: 75%"></el-input>
            <el-button class="validation" @click="acquireVal(user.phone)">获取验证码</el-button>
          </el-form-item>

          <el-form-item label="验证码"   required>
            <el-input v-model="user.validation" type="text" autocomplete="off" placeholder="请输入验证码" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="user.description" type="text" autocomplete="off" placeholder="请输入个人描述" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" required>
            <el-input v-model="user.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="passwordChecked" required>
            <el-input v-model="user.passwordChecked" type="password" autocomplete="off" placeholder="请再次输入密码" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>

          <el-form-item label-width="0">
            <el-button type="primary" @click="onRegister" style="margin-left: 20%;width:100px">注册</el-button>
            <el-button type="danger" @click="clearForm" style="float: right;margin-right: 20%;width:100px">清空</el-button>
            <div class="clearBox"></div>
          </el-form-item>
        </el-form>
      </el-main>
      <el-aside width="30%"></el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        userName: "",
        realName:"",
        sex:"",
        email: "",
        password: "",
        passwordChecked:"",
        phone: "",
        description:"",
        validation:"",
      },
      sex:"",
      validation:" ",
      options: [{
        value: '选项1',
        label: '男'
      }, {
        value: '选项2',
        label: '女',
      }, {
        value: '选项3',
        label: '其他',
      }],
      rules: { //prop的名字必须和uer中的名字一样！！！
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码'}
        ],
        passwordChecked: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    sex(newName){
      if(newName == "选项1"){
        this.user.sex = "男";
      }
      else if(newName == "选项2") {
        this.user.sex = "女";
      }
      else if(newName == "选项3") {
        this.user.sex = "其他";
      }
    }
  },
  created() {
    if(this.$route.params.isReload == 'true'){
      this.$router.go(0);
    }
  },
  methods: {
    onRegister: function () {
      const _this = this;
      if(_this.validation == _this.user.validation) {
        if (_this.user.password == _this.user.passwordChecked) {
          this.$axios.post('user/register', _this.user,
              {
                headers: {
                  "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true
              }
          ).then(function (response) {
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
        } else {
          _this.$message({
            message: '两次输入的密码不一致',
            type: 'error'
          });
        }
      }
      else{
        _this.$message({
          message: '验证码错误，请重新输入',
          type: 'error'
        });
      }
    },
    clearForm: function () {
      this.user.userName = "";
      this.user.realName = "";
      this.user.sex = "";
      this.sex = "";
      this.user.email = "";
      this.user.password = "";
      this.user.passwordChecked = "",
      this.user.phone = "";
      this.user.mobile = "";
      this.user.description = "";
      this.$router.go(0);
    },
    acquireVal:function (telephone) {
      const _this = this
      let formData = new FormData
      formData.append('telephone',telephone)
      this.$axios.post(
          'user/send', formData, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code == '0') {
          _this.validation = response.data.data;
          //alert(_this.validation)
          _this.$message({
            message: '验证码发送成功！',
            type: 'success'
          });
        } else {
          _this.$message.error(response.data.msg);
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    }
  }
}
</script>

<style scoped>
.validation{
  padding-left: 6px;
  text-align: left;
  font-size:10px;
  width: 65px;
  height:36px
}

.register-main {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding-top: 20px;
}

.clearBox {
  clear: both;
}
</style>
