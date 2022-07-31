<template>
  <div>
    <el-dialog
        title="修改密码"
        :visible.sync="ChangePasswordFlag"
        :before-close="handleClose"
        width="40%">
      <ChangePassword></ChangePassword>
    </el-dialog>

    <el-container>
      <el-aside width="15%"></el-aside>
      <el-main class="register-main"
               style="margin-top: 10px;margin-bottom: 10px;width: 400px;height:100%;vertical-align: center">
        <h1 style="color: #409EFF;text-align: center">个人信息</h1>

        <el-form :model="user" :rules="rules" label-width="20%">
          <el-form-item label="用户编号" required>
            <el-input v-model="user.id" type="text" autocomplete="off" disabled
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName" type="text" autocomplete="off" placeholder="请输入用户名" disabled
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName" required>
            <el-input v-model="user.realName" type="text" autocomplete="off" placeholder="请输入真实姓名" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="性别" required>
            <el-select v-model="user.sex" placeholder="请选择性别" style="width: 90%">
              <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" required>
            <el-input v-model="user.email" type="email" autocomplete="off" placeholder="请输入邮箱" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone" required>
            <el-input v-model="user.phone" type="tel" autocomplete="off" placeholder="请输入电话" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="user.description" type="text" autocomplete="off" placeholder="请输入个人描述" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" required>
            <el-input v-model="user.password" type="password" autocomplete="off" placeholder="请输入密码" disabled
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>

          <el-form-item label-width="0">
            <el-button type="primary" @click="save()" style="margin-left: 20%;width:100px">保存</el-button>
            <el-button type="danger" @click="clearForm" style="margin-left: 3%;width:100px">清空</el-button>
            <el-button type="success" @click="changePassword()" style="float: right;margin-right: 10%;width:100px">修改密码</el-button>
            <div class="clearBox"></div>
          </el-form-item>
        </el-form>
      </el-main>
      <el-aside width="25%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import ChangePassword from "@/components/ChangePassword";

export default {
  name: "UserInfo",
  components: {ChangePassword},
  data() {
    return {
      user: {
        id:0,
        userName: "",
        realName:"",
        sex:"",
        email: "",
        password: "",
        phone: "",
        description:"",
      },
      sex:"男",
      ChangePasswordFlag: false,
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
        // mobile: [
        //   { required: true, message: '请输入移动电话', trigger: 'blur' }
        // ],
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
        //print(111);
      }
      else if(newName == "选项3") {
        this.user.sex = "其他";
        //print(111);
      }
    }
  },
  created() {
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
    this.getUserInfo();
  },
  methods: {
    getUserInfo: function(){
      this.user.id = localStorage.getItem('id');
      this.user.userName = localStorage.getItem('userName');
      this.user.realName = localStorage.getItem('realName');
      this.user.password = localStorage.getItem('password');
      this.user.phone = localStorage.getItem('phone');
      this.user.email = localStorage.getItem('email');
      this.user.description = localStorage.getItem('description');
      this.user.sex = localStorage.getItem('sex');
    },
    save: function(){
      const _this = this;
      this.$axios.post('/user/update', {
        "id" : _this.user.id,
        "userName" : _this.user.userName,
        "password" : _this.user.password,
        "realName" : _this.user.realName,
        "sex" : _this.user.sex,
        "email" : _this.user.email,
        "phone" : _this.user.phone,
        "description" : _this.user.description
      }, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (/*response*/) {
        localStorage.setItem("id",_this.user.id);
        localStorage.setItem("userName",_this.user.userName);
        localStorage.setItem("realName",_this.user.realName);
        localStorage.setItem("email",_this.user.email);
        localStorage.setItem("phone",_this.user.phone);
        localStorage.setItem("description",_this.user.description);
        localStorage.setItem("sex",_this.user.sex);
        localStorage.setItem("password",_this.user.password);

        // 这里是处理正确的回调
        _this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch(function (response) {
        // 这里是处理错误的回调
        _this.$message.error(response.data.message)
      })
    },
    clearForm: function () {
      this.user.realName = "";
      this.user.sex = "";
      this.user.email = "";
      this.user.phone = "";
      this.user.mobile = "";
      this.user.description = "";
    },
    changePassword: function(){
      this.ChangePasswordFlag = true;
    },
    handleClose(done) {
      done();
    }
  }
}
</script>

<style scoped>
.register-main {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding-top: 20px;
}

.clearBox {
  clear: both;
}
</style>
