<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程编号" prop="courseId">
        <el-input type="text" v-model="ruleForm.courseId" placeholder="请输入课程编号" disabled></el-input>
      </el-form-item>
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

      <el-form-item>
        <el-button type="primary" @click="editCourse()">修改</el-button>
        <el-button type="danger" @click="reset" style="float: right;margin-right: 100px">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditCourse",
  data(){
    return{
      ruleForm: {
        courseId: '',
        courseName: '',
        courseTeacher: '',
        introduction:'',
        courseCredit:'',
        capacity:''
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
      }
    }
  },
  created(){
    this.getCourseInfo()
  },
  methods: {
    editCourse: function(){
      const _this = this;
      this.$axios.post('/course/update', _this.ruleForm, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        if(response.data.code == '0') {
          // 这里是处理正确的回调
          _this.$message({
            message: '编辑成功',
            type: 'success'
          });
          _this.$router.go(0)
        }else{
          _this.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        _this.$message.error(response.data.msg)
      })
    },
    getCourseInfo: function(){
      this.ruleForm.courseId = localStorage.getItem('editedCourseId')
      this.ruleForm.courseName = localStorage.getItem('editedCourseName')
      this.ruleForm.courseTeacher = localStorage.getItem('realName')
      this.ruleForm.introduction = localStorage.getItem('editedIntroduction')
      this.ruleForm.courseCredit = localStorage.getItem('editedCourseCredit')
      this.ruleForm.capacity= localStorage.getItem('editedCapacity')
    },
    reset: function(){
      this.getCourseInfo()
    }
  }
}
</script>

<style scoped>

</style>
