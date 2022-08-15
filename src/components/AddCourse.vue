<template>
  <div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="课程名:" prop="courseName">
      <el-input type="text" v-model="ruleForm.courseName" placeholder="请输入课程名"></el-input>
    </el-form-item>
    <el-form-item label="授课教师" prop="courseTeacher">
      <el-input type="text" v-model="ruleForm.courseTeacher" placeholder="请输入授课教师" disabled></el-input>
    </el-form-item>
    <el-form-item label="课程介绍" prop="introduction">
      <el-input type="text" v-model="ruleForm.introduction" placeholder="请输入课程介绍"></el-input>
    </el-form-item>
    <el-form-item label="学分" prop="courseCredit">
      <el-input type="number" v-model="ruleForm.courseCredit" placeholder="请输入学分"></el-input>
    </el-form-item>
    <el-form-item label="课容量" prop="capacity">
      <el-input type="number" v-model="ruleForm.capacity" placeholder="请输入课容量"></el-input>
    </el-form-item>

    <el-form-item label="上传文件" prop="courseFile">
      <el-upload
          class="avatar-uploader"
          :multiple="false"
          :action="actionPath"
          accept=".pdf,.doc,.docx,.txt"
          :before-upload="beforeAvatarUpload"
          :data="postData"
          :on-success="uploadSuccess">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addCourse()">添加</el-button>
      <el-button type="danger" @click="reset" style="float: right;margin-right: 100px">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import {genUpToken} from "@/components/qiniuToken";

export default {
  name: "AddCourse",
  data(){
    return{
      ruleForm: {
        courseName: '',
        courseTeacher: '',
        introduction:'',
        courseCredit:'',
        capacity:'',
        courseFile:''
      },
      rules: {
        courseName: [
          { required: true, message: '请输入课程名', trigger: 'blur' }
        ],
        courseTeacher: [
          { required: true, message: '请输入授课教师', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入课程介绍', trigger: 'blur' }
        ],
        courseCredit: [
          { required: true, message: '请输入课程学分', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '请输入课容量', trigger: 'blur' }
        ],
        courseFile: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      },
      actionPath:'https://upload-z1.qiniup.com',
      qiniuaddr: "http://cdn.wanglei99.xyz",
      postData:{
        key:'',//文件名
        token:"",
      },
    }
  },
  created(){
    if(Vue.$cookies.get("userName") == null ) {
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }

    this.ruleForm.courseTeacher = Vue.$cookies.get('realName')

    var token;
    var policy = {};
    var bucketName = 'wanglei2022';
    var AK ='hNl-AywgdWuBco20kCxR6rPMUB-uOV8Hlih7o_gI';
    var SK = 'LZOs_CcKGSsPac8krncFZFJU38Hgd6lCipLZli6x';
    var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    policy.scope = bucketName;
    policy.deadline = deadline;
    token = genUpToken(AK, SK, policy);
    this.postData.token=token;
  },
  methods: {
    addCourse: function(){
      const _this = this;
      this.$axios.post('/course/add', _this.ruleForm, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        if(response.data.code == "0") {
          // 这里是处理正确的回调
          _this.$message({
            message: '添加成功',
            type: 'success'
          });
          _this.$router.go(0)
        }else{
          _this.$message({
            message: response.data.msg,
            type: 'warning'
          });
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        _this.$message.error(response.data.msg)
      })
    },
    reset: function(){
      this.ruleForm.courseName = '';
      this.ruleForm.introduction = '';
      this.ruleForm.courseCredit = '';
      this.ruleForm.capacity = '';
      this.ruleForm.courseFile = '';
    },
    beforeAvatarUpload(file) {
      this.postData.key = file.name
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      const isPDF = extension === "pdf";
      const isDOC = extension === "doc";
      const isDOCX = extension === "docx";
      const isTXT = extension === "txt";
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isPDF && !isDOC && !isDOCX && !isTXT) {
        this.$message.error("上传文件只能是 pdf/doc/docx/txt 格式!");
        return false;
      }
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20MB!');
      }
      return (isPDF|isDOC|isDOCX|isTXT) && isLt20M;
    },
    uploadSuccess(response, file, fileList) {
      console.log(fileList);
      this.ruleForm.courseFile = `${this.qiniuaddr}/${response.key}`;
      console.log(this.uploadPicUrl);
      //在这里你就可以获取到上传到七牛的外链URL了
    },
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 2px dashed #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 40px;
  color: #8c939d;
  width: 280px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
</style>
