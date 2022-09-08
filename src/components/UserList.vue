<template>
  <div>
  <div class="search bar7">
        <el-form onsubmit="return false">
          <input v-model="searchArea" type="text" placeholder="请输入您要搜索的真实姓名...">
          <button class="searchButton" @click="search()"></button>
        </el-form>
      </div>

    <div class="userList">
    <el-table :data="userList" border>
      <el-table-column type="selection" width="40" align="center" />
      <el-table-column label="用户编号" align="center" prop="userId" fixed-width />
      <el-table-column label="用户名" align="center" prop="userName" fixed-width />
      <el-table-column label="真实姓名" align="center" prop="realName" fixed-width />
      <el-table-column label="性别" align="center" prop="sex" fixed-width />
      <el-table-column label="邮箱" align="center" prop="email" fixed-width />
      <el-table-column label="电话" align="center" prop="phone" fixed-width />
<!--      <el-table-column label="描述" align="center" prop="description" fixed-width />-->
<!--      <el-table-column label="是否有效" align="center" prop="isActive" width="90">-->
<!--       &lt;!&ndash; 通过 slot-scope="scope" 接收数据 &ndash;&gt;-->
<!--       <template slot-scope="scope">-->
<!--         &lt;!&ndash; scope.row 接收这一行数据 active-value: switch 打开时的值, inactive-value: switch 关闭时的值 &ndash;&gt;-->
<!--         <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"></el-switch>-->
<!--       </template>-->
<!--     </el-table-column>-->

     <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
       <template>
         <el-button size="mini" type="text" icon="el-icon-edit" @click="refuse()">修改</el-button>
         <el-button size="mini" type="text" icon="el-icon-delete" @click="refuse()">删除</el-button>
       </template>
     </el-table-column>
    </el-table>
    </div>

    <div style="margin-right: 80px; margin-top: 20px">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalUser"
          @current-change="handleCurrentChange"
          style="float: right">
      </el-pagination>
    </div>
  </div>
</template>

<!--<template>-->
<!--  <div>-->
<!--    <iframe id = "testMsg" style = "padding-left:250px;padding-right:250px;width: 1500px;height: 600px;" src = 'https://www.thingjs.com/pp/e7524801afe1e1271b939375' ></iframe>-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<script>
import Vue from "vue";

export default {
  name: "UserList",
  data(){
    return {
      userList: [],
      totalUser: 0,
      pageNum: 1,
      pageSize: 10,
      searchArea:"",
      form: {
        "from":0,
        "num":10,
      },
    }

  },
  created() {
    if(Vue.$cookies.get("userName") == null ) {
      this.$router.push({name: 'Login', params: {isReload: 'true'}});
    }

    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
    this.getUserList();
  },
  methods: {
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.form.from = (pageNum-1)*10
      this.form.num = 10
      this.getUserList();
    },
    search: function(){
      const _this = this;
      this.$axios.post('/user/search', {"realName":_this.searchArea}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
          // 这里是处理正确的回调
          _this.userList= response.data.data;
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
    refuse: function(){
      this.$message.error("您没有修改他人信息的权限！");
    },
    getUserList: function(){
      const _this = this;
      let formData = new FormData;
      formData.append('from', _this.form.from);
      formData.append('num', _this.form.num);
      this.$axios.post('/user/list', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.userList= response.data.data;
        _this.pageSize = 10;
        _this.getTotalUser();
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })

    },
    getTotalUser: function(){
      const _this = this;
      let formData = new FormData;
      this.$axios.post('/user/count', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.totalUser= response.data.data;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
  }
}
</script>

<style scoped>
.userList{
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
