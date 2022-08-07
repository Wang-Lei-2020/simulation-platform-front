<template>
  <el-form>
    <el-form-item label="上传图片" prop="picture">
      <el-upload
          class="avatar-uploader"
          :multiple="false"
          :action="actionPath"
          accept="image/jpeg,image/gif,image/png,image/bmp"
          :before-upload="beforeAvatarUpload"
          :data="postData"
          :on-success="uploadSuccess">
        <img v-if="uploadPicUrl" :src="uploadPicUrl" class="avatar">
        <i v-if="!uploadPicUrl" class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button style="margin-left: 150px" type="primary" @click="changePhoto()">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {genUpToken} from "./qiniuToken";
import Vue from "vue";

export default {
  name: "ChangePhoto",
  data() {
    return {
      rules: {
        picture: [
          { required: true, message: '请上传头像图片', trigger: 'blur' }
        ]
      },
      actionPath:'https://upload-z1.qiniup.com',
      postData:{
        token:"",
      },
      qiniuaddr: "http://quwn8qjnc.hb-bkt.clouddn.com",
      uploadPicUrl:"",
    };
  },
  created(){
    var token;
    var policy = {};
    var bucketName = 'wanglei2021';
    var AK ='hNl-AywgdWuBco20kCxR6rPMUB-uOV8Hlih7o_gI';
    var SK = 'LZOs_CcKGSsPac8krncFZFJU38Hgd6lCipLZli6x';
    var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    policy.scope = bucketName;
    policy.deadline = deadline;
    token=genUpToken(AK, SK, policy);
    this.postData.token=token;
  },
  methods: {
    changePhoto:function(){
      const _this = this
      this.$axios.post('/user/changePhoto', {
        // "userId":localStorage.getItem("userId"),
        "userId":Vue.$cookies.get("userId"),
        "logoImage":_this.uploadPicUrl,
      }, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code === '503') {
          // if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
          if (JSON.parse(Vue.$cookies.get('islogin'))) { //判断本地是否存在access_token
            let flag = false;
            _this.$store.commit('login', flag);
            // localStorage.clear();
            const cookies = Vue.$cookies.keys();
            for (let i = 0; i < cookies.length; i++) {
              Vue.$cookies.remove(cookies[i])
            }

            _this.$router.go(0);
            _this.$message('您的登录已超时，请重新登录');
          } else {
            _this.$message(response.data.msg);
          }
        } else {
          if (response.data.code === '0') {
            // localStorage.setItem('userUrl', _this.uploadPicUrl)
            Vue.$cookies.set('userUrl', _this.uploadPicUrl, "1D")
            _this.$message({
              message: '更改头像成功！',
              type: 'success'
            });
            _this.$router.go(0)
          }
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
    uploadSuccess(response, file, fileList) {
      console.log(fileList);
      this.uploadPicUrl = `${this.qiniuaddr}/${response.key}`;
      console.log(this.uploadPicUrl);
      //在这里你就可以获取到上传到七牛的外链URL了
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG|isJPEG|isPNG) && isLt2M;
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
