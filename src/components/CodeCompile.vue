<template>
  <div>
    <div class="codeInput">
      <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="textarea">

      </el-input>
    </div>
    <div class="compileConfirm">
      <el-select v-model="value" placeholder="python">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="compile">运行</el-button>
    </div>
    <div class="compileResult">
      <p>{{this.compileResult}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeCompile",
  data() {
    return {
      textarea: '',
      options: [{
        value: 'python',
        label: 'python'
      }, {
        value: 'java',
        label: 'java'
      }],
      value: 'python',
      compileResult: ''
    }
  },
  methods: {
    compile: function () {
      const _this = this
      let formData = new FormData;
      formData.append('code', this.textarea);
      formData.append('lang', this.value);
      this.$axios.post('/code/compile', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        if(response.data.code === '0'){
          _this.compileResult = response.data.data;
        }else{
          _this.compileResult = '编译失败';
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>