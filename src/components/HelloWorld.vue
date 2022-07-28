<template>
  <div>
    {{user.email}}
    {{msg}}
    <button v-on:click="onLogin">login</button>
    <button v-on:click="testsession">testsession</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      user: {},
      msg:""
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    // //this指的是当前的vue对象，把vue对象赋给_this
    // const _this = this
    // this.axios.get('http://localhost:8081/login').then(function (resp) {
    //   //回调函数中的this指的是回调
    //   //把data数据赋给_this，即vue对象
    //   _this.user = resp.data
    //   _this.msg = _this.$session.get("msg");
    // })
  },
  methods: {
    testsession: function () {
      this.axios.get('http://localhost:8081/login/test').then((response) => {
        // this.axios.get('http://localhost:8081/test').then((response) => {//台账管理系统
        this.msg = response.data;
      }).catch((response) => {
        console.log(response);
      })
    },
    onLogin: function () {
      const _this = this
      // this.$axios.post('http://localhost:8081/login?password=123&email=1@qq.com', {}, {//台账管理系统
      this.$axios.post('http://localhost:8081/login', {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        // _this.user = response.data.data//台账管理系统
        _this.user = response.data

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