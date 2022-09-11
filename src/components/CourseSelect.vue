<template>
  <div style="margin-left: 5%; margin-right: 5%; margin-top: 2%">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基础知识" name="first">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toExperiment" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toExperiment">仿真实验基础知识：传感器安放</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200854 </p>
          </div></el-col>
        </el-row>
        <el-divider></el-divider>

      </el-tab-pane>

      <el-tab-pane label="进阶课程" name="second">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">计算机网络</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200888 </p>
          </div></el-col>
          <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">大数据概论</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200866 </p>
          </div></el-col>
          <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">软件体系结构</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200879 </p>
          </div></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">软件项目管理</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200804 </p>
          </div></el-col>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="仿真实验" name="third">
        <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content">
          <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
          <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">实验：基于ARIMA的天气预测系统</el-link>
          <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200856 </p>
        </div></el-col>
        </el-row>
        <el-divider></el-divider>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
export default {
  name: "CourseSelect",

  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    toExperiment(){
      this.$router.push({name: 'Experiment', params: {isReload: 'true'}});
    },
    toCourse(){
      this.$router.push({name: 'CourseStudy', params: {isReload: 'true'}});
    }
  }
}
</script>

<style scoped>
.el-row{
  width: 90%;
}

.grid-content {
  height: 300px;
  /*background-color: #8c939d;*/
}
</style>