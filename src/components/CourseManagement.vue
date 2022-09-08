<template>
  <div>
    <el-dialog
        title="添加课程"
        :visible.sync="addCourseFlag"
        :before-close="handleClose"
        width="30%">
      <AddCourse></AddCourse>
    </el-dialog>

    <el-dialog
        title="编辑课程"
        :visible.sync="editCourseFlag"
        :before-close="handleClose"
        width="30%">
      <EditCourse></EditCourse>
    </el-dialog>
    <el-dialog
        title="上传习题"
        :visible.sync="addExerciseFlag"
        :before-close="handleClose"
        width="30%">
      <AddExercise></AddExercise>
    </el-dialog>
    <div>
      <div class="search bar7" style="float: left">
        <el-form onsubmit="return false">
          <input v-model="searchArea" type="text" placeholder="请输入您要搜索的课程名...">
          <button class="searchButton" @click="search()"></button>
        </el-form>
      </div>
      <el-button v-if="isTeacher" type="primary" style="float:right;margin-right: 100px;margin-top: 12px" icon="el-icon-circle-plus" @click="addCourse()">添加课程</el-button>
    </div>

    <div class="courseList">
      <el-table :data="courseList" border>
        <el-table-column label="课程编号" align="center" prop="courseId" width="80px" />
        <el-table-column label="课程名" align="center" prop="courseName" fixed-width />
        <el-table-column label="课程介绍" align="center" prop="introduction" fixed-width />
        <el-table-column label="授课教师" align="center" prop="courseTeacher" width="90px" />
        <el-table-column label="学分" align="center" prop="courseCredit" width="70px" />
        <el-table-column label="课容量" align="center" prop="capacity" width="90px" />
<!--        <el-table-column label="剩余量" align="center" prop="leftCapacity" fixed-width />-->

        <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="!isTeacher" size="mini" type="text" icon="el-icon-success" @click="selectCourse(scope.row.courseId)">选课</el-button>
            <el-button v-if="isTeacher" size="mini" type="text" icon="el-icon-upload2" @click="transAddExercise(scope.row)">上传习题</el-button>
<!--            <el-upload-->
<!--                v-if="isTeacher"-->
<!--                class="avatar-uploader"-->
<!--                :multiple="false"-->
<!--                :action="ImportExercisePath"-->
<!--                accept=".csv,.xls,.xlsx"-->
<!--                :before-upload="beforeUpload"-->
<!--                :data="{courseId:scope.row.courseId}"-->
<!--                :on-success="uploadSuccess">-->
<!--              <el-button size="mini" type="text" icon="el-icon-upload2">上传习题</el-button>-->
<!--            </el-upload>-->
            <el-button v-if="isTeacher" size="mini" type="text" icon="el-icon-edit-outline" @click="editCourse(scope.row)">编辑</el-button>
            <el-button v-if="isTeacher" size="mini" type="text" icon="el-icon-delete-solid" @click="cancelCourse(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-right: 80px; margin-top: 20px">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCourse"
          @current-change="handleCurrentChange"
          style="float: right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import AddCourse from "@/components/AddCourse";
import EditCourse from "@/components/EditCourse";
import Vue from "vue";
import AddExercise from "@/components/AddExercise";

export default {
  name: "CourseManagement",
  components:{AddExercise, EditCourse, AddCourse},
  data() {
    return{
      courseList:[],
      totalCourse: 0,
      pageNum: 1,
      pageSize: 10,
      searchArea:"",
      form: {
        "from":0,
        "num":10,
      },
      ImportExercisePath:"http://localhost:8081/exercise/uploadGroup",
      chosenCourseId: 0,
      //后端识别excel上传习题接口
      addCourseFlag: false,
      editCourseFlag: false,
      addExerciseFlag: false,
    }
  },
  created() {
    if(Vue.$cookies.get("userName") == null ) {
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }

    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
    this.getCourseList();
  },
  computed: {
    isTeacher: function(){
      // return localStorage.getItem('role') === "teacher";
      return Vue.$cookies.get('role') === "teacher";
    }
  },
  methods:{
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.form.from = (pageNum-1)*10
      this.form.num = 10
      this.getCourseList();
    },
    search: function(){
      const _this = this;
      this.$axios.post('/course/search', {"courseName":_this.searchArea}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.courseList= response.data.data;
        _this.pageSize = 100;
        // _this.pageNum = response.data.data.pageNum;
        _this.$message({
          message: '搜索成功',
          type: 'success'
        });
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    selectCourse: function(courseId){
      const _this = this;
      // this.$axios.post('/course/select', {"courseId":courseId,"userId":localStorage.getItem("userId")}, {
      this.$axios.post('/course/select', {"courseId":courseId,"userId":Vue.$cookies.get("userId")}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        if(response.data.code === '0') {
          // 这里是处理正确的回调
          _this.$message({
            message: '选课成功',
            type: 'success'
          });
        }else{
          _this.$message({
            message: response.data.msg,
            type: 'warning'
          });
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getCourseList: function(){
      const _this = this;
      let formData = new FormData;
      formData.append('from', _this.form.from);
      formData.append('num', _this.form.num);
      this.$axios.post('/course/list', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.courseList= response.data.data;
        _this.pageSize = 10;
        _this.getTotalCourse();
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getTotalCourse: function(){
      const _this = this;
      let formData = new FormData;
      this.$axios.post('/course/count', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.totalCourse= response.data.data;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    addCourse: function(){
      this.addCourseFlag = true;
    },
    editCourse: function(row){
      const _this = this;
      // if(row.courseTeacher === localStorage.getItem('realName')){
      if(row.courseTeacher === Vue.$cookies.get('realName')){
        this.editCourseFlag = true
        // localStorage.setItem('editedCourseId',row.courseId)
        // localStorage.setItem('editedCourseName',row.courseName)
        // localStorage.setItem('editedIntroduction',row.introduction)
        // localStorage.setItem('editedCourseCredit',row.courseCredit)
        // localStorage.setItem('editedCapacity',row.capacity)

        Vue.$cookies.set('editedCourseId',row.courseId, "1D")
        Vue.$cookies.set('editedCourseName',row.courseName, "1D")
        Vue.$cookies.set('editedIntroduction',row.introduction, "1D")
        Vue.$cookies.set('editedCourseCredit',row.courseCredit, "1D")
        Vue.$cookies.set('editedCapacity',row.capacity, "1D")
        Vue.$cookies.set('editedCourseFile',row.courseFile, "1D")
      }else{
        _this.$message({
          message: '只能编辑自己的课程！',
          type: 'warning'
        });
      }
    },
    cancelCourse: function(row){
      const _this = this;
      // if(row.courseTeacher === localStorage.getItem('realName')) {
      if(row.courseTeacher === Vue.$cookies.get('realName')) {
        this.$axios.post('/course/delete', {'courseId':row.courseId,'courseTeacher':row.courseTeacher}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function () {
          // 这里是处理正确的回调
          _this.$message({
            message: '删除成功！',
            type: 'success'
          });
          _this.$router.go(0)
        }).catch(function (response) {
          // 这里是处理错误的回调
          console.log(response)
        })
      }else{
        _this.$message({
          message: '只能删除自己的课程！',
          type: 'warning'
        });
      }
    },
    handleClose(done) {
      done();
    },
    transAddExercise:function (e){
      this.addExerciseFlag = true
      this.chosenCourseId = e.courseId
    }

  }
}
</script>

<style scoped>
.courseList{
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #494A5F;
  font-weight: 500;
  font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;
}

div.search {padding: 10px 0;}

form {
  position: relative;
  width: 300px;
  /*margin: 0 auto;*/
  margin-left: 350px;
}

input, button {
  border: none;
  outline: none;
}

input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}

.searchButton {
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}


/*搜索框7*/
.bar7 {background: #fff;}
.bar7 form {
  height: 20px;
}
.bar7 input {
  width: 250px;
  border-radius: 42px;
  border: 2px solid #324B4E;
  background: #F9F0DA;
  transition: .3s linear;
  float: right;
}
.bar7 input:focus {
  width: 300px;
}
.bar7 button {
  background: none;
  top: -2px;
  right: 0;
}
.bar7 button:before{
  content: "\f002";
  font-family: FontAwesome;
  color: #324b4e;
}
/*.avatar-uploader {*/
/*  !*border: 2px dashed #d9d9d9;*!*/
/*  !*border-radius: 10px;*!*/
/*  cursor: pointer;*/
/*  position: relative;*/
/*  overflow: hidden;*/
/*  width:80px;*/
/*}*/
</style>

<style src="../font-awesome-4.7.0/css/font-awesome.min.css">
</style>
