<template>
  <div class="panel">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{bookName}}</span>
        <span style="float: right">{{pageNum}}/{{pages}}</span>
<!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="text item" style="word-wrap: break-word;white-space : normal">
        <pre style="white-space:pre-wrap;">{{ content }}</pre>
      </div>
    </el-card>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="pages"
        @current-change="handleCurrentChange"
        style="float: right">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      bookId: localStorage.getItem('bookId'),
      bookName: '',
      content: '',
      pageNum: '',
      pages: '',
      // total: '',
    }
  },
  created(){
    this.getPageMsg();
  },
  methods:{
    handleCurrentChange: function (pageNum){
      this.pageNum = pageNum;
      this.getPageMsg();
    },
    getPageMsg: function (){
      const _this = this
      let formData = new FormData();
      formData.append('bookId', _this.bookId);
      formData.append('pageNum', _this.pageNum);
      this.$axios.post('/book/read', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        // _this.user = response.data.data//台账管理系统
        if(response.data.code == '503'){
          if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
            let flag = false;
            _this.$store.commit('login', flag);
            localStorage.clear();
            _this.$router.push({name: 'Home', params: {isReload: 'true'}});
            _this.$message('您的登录已超时，请重新登录');
          }else{
            _this.$message(response.data.msg);
          }
        }else{
          _this.bookName = response.data.data.bookMsg.name;
          _this.content = response.data.data.content;
          _this.pages = response.data.data.pages;
          _this.pageNum = response.data.data.pageNum;
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  margin: 50px auto 10px auto;
}

.panel {
  width: 70%;
  margin: 50px auto 50px auto;
}
</style>
