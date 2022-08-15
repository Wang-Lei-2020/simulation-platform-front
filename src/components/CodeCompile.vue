<template>
  <div>
    <div class="codeInput" style="margin: 20px 30px 20px 30px">
      <el-input
          type="textarea"
          :rows="13"
          placeholder="请输入代码"
          v-model="textarea">
      </el-input>
    </div>
    <div class="compileConfirm" style="margin: 0 0 0 30px">
      <el-select v-model="value" placeholder="python" @change="filledInputWithJavaCode($event)">
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
      textarea: 'import numpy as np;\n' +
          'import pandas as pd;\n' +
          'from pandas import Series,DataFrame;\n' +
          'from numpy import nan as NaN;\n' +
          'data = DataFrame([[22,\'man\',\'18703188717\'],[12,\'man\',NaN],[19,\'woman\',NaN],[17,NaN,NaN],[NaN,NaN,NaN]],columns=[\'age\',\'sex\',\'phone\']);\n' +
          '#data = data.dropna(axis=0, how=\'all\');#删除全部为NaN的行\n' +
          '#data = data.dropna(axis=0, how=\'any\');#删除有NaN的行\n' +
          '#data = data.dropna(axis=1, how=\'all\');#删除全部为NaN的列\n' +
          '#data = data.fillna(0)#将NaN填充为0\n' +
          'data = data.fillna({\'age\':20,\'sex\':233,\'phone\':666})#通过字典来填充，以实现对不同的列填充不同的值\n' +
          'print(data);',
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
    },
    filledInputWithJavaCode(value) {
      if(value === "java"){
        this.textarea='public class Solution {\n  public static void main(String[] args) {\n    \n  }\n}';
      }else{
        this.textarea='';
      }
    }
  }
}
</script>

<style scoped>

</style>
