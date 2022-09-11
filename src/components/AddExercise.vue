<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题组名称:" prop="courseName">
        <el-input type="text" v-model="ruleForm.groupName" placeholder="请输入课程名"></el-input>
      </el-form-item>
      <el-form-item label="上传文件" prop="courseFile">
        <el-upload
            class="avatar-uploader"
            :multiple="false"
            action="#"
            :auto-upload="false"
            accept=".csv,.xls,.xlsx"
            :on-remove="handleRemove"
            :on-change="changeFile">
          <!--            :data="{courseId:1}"-->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addExercise()">确认</el-button>
        <el-button type="danger" @click="Cancel()" style="float: right;margin-right: 100px">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "AddExercise",
  inject: ['sendCourseId'],
  data(){
    return{
      ruleForm: {
        groupName: '',
      },
      iAddExerciseFlag: true,
      rules: {
        groupName: [
          {required: true, message: '请输入题组名称', trigger: 'blur'}
        ],
      },
      ImportExercisePath:"http://localhost:8081/exercise/uploadGroup",
      importFileList: new FormData(),
      flag: false,
      courseId: 0,
  }
  },
  created() {
    this.courseId = this.sendCourseId.chosenCourseId
      this.importFileList.append('courseId',this.courseId)
    if(Vue.$cookies.get("userName") == null ) {
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }
  },
  watch:{
    // chosenCourseId:function(newData){
    //   this.importFileList.append('courseId',newData)
    //   console.log("courseId传参：",newData)
    // },
  //   addExerciseFlag:function (newData){
  //     this.iAddExerciseFlag = newData
  //     console.log(this.iAddExerciseFlag)
  //   }
  },
  methods:{

    changeFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      const isXLS = extension === "xls";
      const isXLSX = extension === "xlsx";
      const isCSV = extension === "csv";
      const isLt40M = file.size / 1024 / 1024 < 40;

      if (!isXLS && !isXLSX && !isCSV) {
        this.$message.error("上传文件只能是 xls/xlsx/csv 格式!");
        return false;
      }
      if (!isLt40M) {
        this.$message.error('上传文件大小不能超过 40MB!');
      }
      this.importFileList.append('file',file.raw)
      this.importFileList.append('groupName',this.ruleForm.groupName)
      console.log("文件流：",this.importFileList.get('file'))
      this.flag = true
      return (isXLS|isXLSX|isCSV) && isLt40M;
    },
    handleRemove: function (file){
      //接收后端返回参数
      this.importFileList.delete(file)
    },
    addExercise: function(){
      const _this = this;
      if(this.flag){
        this.$axios.post("/exercise/uploadGroup",this.importFileList,{
          headers: {
            "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryZMoZTa1SZq4t5k2f"
          },
          withCredentials: true
        })
        _this.$router.go(0)
            .then(function (response) {
          if(response.data.code == "0") {
            // 这里是处理正确的回调
            _this.$message({
              message: '添加成功',
              type: 'success'
            });
            _this.$router.go(0)
          }
          else{
            _this.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
      .catch(function (response) {
          // 这里是处理错误的回调
          _this.$message.error(response.data.msg)
        })
        }
      },
    Cancel: function(){
      this.$router.go(0)
    }
  }
}

</script>
<!--<script setup lang="ts">-->
<!--//prop 可以使用 defineProps() 宏来定义-->
<!--const props = defineProps(['addExerciseFlag'])-->
<!--</script>-->
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
