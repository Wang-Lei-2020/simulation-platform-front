<template>
  <div>
    <div class="codeInput" style="margin: 20px 30px 20px 30px">
      <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入代码"
          v-model="textarea">
      </el-input>
    </div>
    <div class="compileConfirm" style="margin: 0 0 0 30px">
      <el-select v-model="value" placeholder="python">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="compile" style="margin-left: 30px;width: 100px">运行</el-button>
    </div>
    <div class="compileResult" style="margin: 0 30px 0 30px">
      <p>运行结果：</p>
<!--      <p>{{this.compileResult}}</p>-->
      <el-input
          type="textarea"
          :rows="7"
          placeholder="运行结果..."
          v-model="compileResult"
          disabled>
      </el-input>
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
