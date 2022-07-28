<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="书籍名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="书籍描述" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="上传文件" prop="bookFile">
      <el-upload
          class="upload-demo"
          drag
          ref="upload"
          action=""
          :http-request="httpRequest"
          :multiple="false"
          :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "BookForm",
  data() {
    return {
      ruleForm: {
        name: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填书籍描述', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    httpRequest(param){
      let fd = new FormData()// FormData 对象
      fd.append('file', param.file)// 文件对象
      fd.append('bookName', this.ruleForm.name)
      fd.append('bookDesc', this.ruleForm.desc)

      const _this = this
      this.$axios.post('/book/addbook', fd, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if(response.data.code == '503'){
          if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
            let flag = false;
            _this.$store.commit('login', flag);
            localStorage.clear();
            _this.$router.go(0);
            _this.$message('您的登录已超时，请重新登录');
          }else{
            _this.$message(response.data.msg);
          }
        }else{
          if (response.data.code == '0') {
            _this.$message({
              message: '上传成功！',
              type: 'success'
            });
            _this.$refs.upload.clearFiles();
            _this.resetForm('ruleForm');
          }
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

</style>