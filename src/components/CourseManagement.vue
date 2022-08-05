<template>
  <div>
    <div class="search bar7">
      <el-form onsubmit="return false">
        <input v-model="searchArea" type="text" placeholder="请输入您要搜索的课程名...">
        <button class="searchButton" @click="search()"></button>
      </el-form>
    </div>

    <div class="courseList">
      <el-table :data="courseList" border>
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column label="课程编号" align="center" prop="courseId" fixed-width />
        <el-table-column label="课程名" align="center" prop="courseName" fixed-width />
        <el-table-column label="授课教师" align="center" prop="courseTeacher" fixed-width />
        <el-table-column label="课程介绍" align="center" prop="introduction" fixed-width />
        <el-table-column label="学分" align="center" prop="courseCredit" fixed-width />
        <el-table-column label="课容量" align="center" prop="capacity" fixed-width />
        <el-table-column label="剩余量" align="center" prop="leftCapacity" fixed-width />

        <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="el-icon-success" @click="selectCourse(scope.row.courseId)">选课</el-button>
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
export default {
  name: "CourseManagement",
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
      this.$axios.post('/course/selectCourse', {"courseId":courseId,"userId":localStorage.getItem("userId")}, {
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

div.search {padding: 20px 0;}

form {
  position: relative;
  width: 300px;
  margin: 0 auto;
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
</style>

<style src="../font-awesome-4.7.0/css/font-awesome.min.css">
</style>
