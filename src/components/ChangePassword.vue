<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码:" prop="originalPassword">
      <el-input type="password" v-model="ruleForm.originalPassword" placeholder="请输入原始密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入新密码"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPassword">
      <el-input type="password" v-model="ruleForm.checkPassword" placeholder="请再次确认密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="changePassword">修改</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from "vue";

export default {
  name: "ChangePassword",
  data() {
    return {
      ruleForm: {
        originalPassword: '',
        newPassword: '',
        checkPassword:'',
      },
      correctPassword:2,//判断密码是否正确
      rules: {
        originalPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次确认密码', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    if(Vue.$cookies.get("userName") == null ) {
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }
  },
  methods: {
    //此函数未用到
    checkPassword: function(){
      const _this = this;
      let formData = new FormData;
      // formData.append("userId",localStorage.getItem("userId"))
      formData.append("userId",Vue.$cookies.get("userId"))
      formData.append("password",_this.ruleForm.originalPassword)
      this.$axios.post('/user/checkPassword', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        _this.correctPassword = response.data.data
        return response.data.data === 1;
      }).catch(function (response) {
        console.log(response)
        return false;
      })
    },
    changePassword: function(){
      const _this = this;
      //_this.checkPassword()//未实现两函数异步执行
      // if(_this.ruleForm.originalPassword === localStorage.getItem('password')) {
      if(_this.ruleForm.originalPassword === Vue.$cookies.get('password')) {
        if (_this.ruleForm.newPassword === _this.ruleForm.checkPassword) {
          this.$axios.post('/user/update', {
            // "userId" : localStorage.getItem('userId'),
            // "userName" : localStorage.getItem('userName'),
            // "password" : _this.ruleForm.checkPassword,
            // "realName" : localStorage.getItem('realName'),
            // "sex" : localStorage.getItem('sex'),
            // "email" : localStorage.getItem('email'),
            // "phone" : localStorage.getItem('phone'),
            // "description" : localStorage.getItem('description')

            "userId" : Vue.$cookies.get('userId'),
            "userName" : Vue.$cookies.get('userName'),
            "password" : _this.ruleForm.checkPassword,
            "realName" : Vue.$cookies.get('realName'),
            "sex" : Vue.$cookies.get('sex'),
            "email" : Vue.$cookies.get('email'),
            "phone" : Vue.$cookies.get('phone'),
            "description" : Vue.$cookies.get('description')
          }, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (/*response*/) {
            let flag = false;
            _this.$store.commit('login', flag);
            // localStorage.clear();
            const cookies = Vue.$cookies.keys();
            for (let i = 0; i < cookies.length; i++) {
              Vue.$cookies.remove(cookies[i])
            }

            _this.$message({
              message: '修改密码成功！',
              type: 'success'
            });
            _this.$router.push({name: "Login", params: {isReload: 'true'}});
          }).catch(function (response) {
            // 这里是处理错误的回调
            _this.$message.error(response.data.msg)
          })
        } else {
          _this.$message({
            message: '两次输入的新密码不一致',
            type: 'error'
          });
        }
      }
      else{
        _this.$message.error("您输入的原密码错误！");
      }
    },
    reset: function(){
      this.ruleForm.originalPassword = '';
      this.ruleForm.newPassword = ''
      this.ruleForm.checkPassword = '';
    }
  }
}
</script>

<style scoped>

</style>
