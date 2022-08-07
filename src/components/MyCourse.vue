<template>
  <div class="courseList" style="margin-top: 20px">
    <el-table :data="myCourseList" border>
      <el-table-column label="课程编号" align="center" prop="courseId" fixed-width />
      <el-table-column label="课程名" align="center" prop="courseName" fixed-width />
      <el-table-column label="授课教师" align="center" prop="courseTeacher" fixed-width />
      <el-table-column label="课程介绍" align="center" prop="introduction" fixed-width />
      <el-table-column label="学分" align="center" prop="courseCredit" fixed-width />
      <el-table-column label="课容量" align="center" prop="capacity" fixed-width />

      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-success" @click="selectCourse(scope.row)">进入课程</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete-solid" @click="deletePickCourse(scope.row)">退课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "MyCourse",
  data() {
    return{
      myCourseList:[],
    }
  },
  created() {
    if(Vue.$cookies.get("userName") == null ) {
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }

    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
    this.getMyCourseList();
  },
  methods:{
    getMyCourseList: function(){
      const _this = this;
      let formData = new FormData;
      // formData.append('userId',localStorage.getItem('userId'));
      formData.append('userId',Vue.$cookies.get('userId'));

      this.$axios.post('/course/myCourseList', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.myCourseList= response.data.data;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    deletePickCourse: function(row){
      const _this = this;
      // this.$axios.post('/course/deletePickCourse', {'courseId':row.courseId,'userId':localStorage.getItem('userId')}, {
      this.$axios.post('/course/deletePickCourse', {'courseId':row.courseId,'userId':Vue.$cookies.get('userId')}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调
        _this.$message({
          message: '退课成功！',
          type: 'success'
        });
        _this.$router.go(0)
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    selectCourse: function(row){
      //TODO  等待编写
      console.log(row.courseName)
    }
  }
}
</script>

<style scoped>

</style>
