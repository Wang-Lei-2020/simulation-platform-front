<template>
  <div style="margin-left: 5%; margin-right: 5%; margin-top: 2%">
    <el-popover
        placement="bottom-start"
        width="1150"
        trigger="hover">
      <el-button slot="reference">选课目录</el-button>
      <!-- 弹框内容 -->
      <div class="div_content">
        <el-row style="min-height: 50px">
          <el-col style="width: 520px">
            <p style="margin-left: 75px">基础知识</p>
          </el-col>
          <el-col style="width: 300px">
            <p>进阶课程</p>
          </el-col>
          <el-col style="width: 70px; margin-left: 145px">
            <p>仿真实验</p>
          </el-col>
        </el-row>

        <el-row style="width: 100%">
          <el-col style="width: 350px;">
            <el-row style="width: 100%;">
              <el-col style="width: 60%">
                <el-card class="box-card" style="width: 200px">
                  <div slot="header" class="clearfix">
                    <span>传感器</span>
                    <el-button style="float: right; padding: 3px 0" type="text" disabled>已选课</el-button>
                  </div>
                </el-card>
              </el-col>
              <el-col  style="width: 40%">
                <hr style="margin-left: 0; margin-top: 50px; width: 100%">
              </el-col>
            </el-row>

            <el-row style="width: 100%;">
              <el-col style="width: 60%">
                <el-card class="box-card" style="width: 200px">
                  <div slot="header" class="clearfix">
                    <span>C语言程序设计</span>
                    <el-button style="float: right; padding: 3px 0" type="text">选课</el-button>
                  </div>
                </el-card>
              </el-col>
              <el-col  style="width: 40%">
                <hr style="margin-left: 0; margin-top: 50px; width: 100%">
              </el-col>
            </el-row>

            <el-row style="width: 100%;">
              <el-col style="width: 60%">
                <el-card class="box-card" style="width: 200px">
                  <div slot="header" class="clearfix">
                    <span>面向对象编程原理</span>
                    <el-button style="float: right; padding: 3px 0" type="text">选课</el-button>
                  </div>
                </el-card>
              </el-col>
              <el-col  style="width: 40%">
                <hr style="margin-left: 0; margin-top: 50px; width: 100%">
              </el-col>
            </el-row>

            <el-row style="width: 100%;">
              <el-col style="width: 60%">
                <el-card class="box-card" style="width: 200px">
                  <div slot="header" class="clearfix">
                    <span>计算机组成原理</span>
                    <el-button style="float: right; padding: 3px 0" type="text">选课</el-button>
                  </div>
                </el-card>
              </el-col>
              <el-col  style="width: 40%">
                <hr style="margin-left: 0; margin-top: 50px; width: 100%">
              </el-col>
            </el-row>

          </el-col>
          <el-col style="width: 1px">
            <el-row>
              <hr width=1 size=100 style="margin-left: 0; margin-top: 50px">
            </el-row>
            <el-row>
              <hr width=1 size=100 style="margin-left: 0; margin-top: 90px">
            </el-row>
          </el-col>

          <el-col style="width: 100px;">
            <el-row style="height: 200px;">
              <hr width=100 style="margin-left: 0; margin-top: 90px">
            </el-row>
            <el-row style="height: 200px;">
              <hr width=100 style="margin-left: 0; margin-top: 90px">
            </el-row>
          </el-col>

          <el-col style="width: 350px; height: 100%">
            <el-row style="width: 100%">
              <el-col style="width: 60%; height: 200px; margin-top: 35px">
                <el-card class="box-card" style="width: 200px">
                  <div slot="header" class="clearfix">
                    <span>嵌入式编程</span>
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content">请完成以下课程的学习：<br/>C语言程序设计</div>
                      <el-button style="float: right; padding: 3px 0" type="text">选课</el-button>
                    </el-tooltip>
                  </div>
                </el-card>
              </el-col>
              <el-col  style="width: 40%">
                <hr style="margin-left: 0; margin-top: 85px; width: 100%">
              </el-col>
            </el-row>
            <el-row style="width: 100%">
              <el-col style="width: 60%">
                <el-card class="box-card" style="width: 200px">
                  <div slot="header" class="clearfix">
                    <span>计算机网络</span>
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content">请完成以下课程的学习：<br/>面向对象编程原理、计算机组成原理</div>
                      <el-button style="float: right; padding: 3px 0" type="text">选课</el-button>
                    </el-tooltip>
                  </div>
                </el-card>
              </el-col>
              <el-col  style="width: 40%">
                <hr style="margin-left: 0; margin-top: 50px; width: 100%">
              </el-col>
            </el-row>
          </el-col>

          <el-col style="width: 1px">
            <el-row>
              <hr width=1 size=200 style="margin-left: 0; margin-top: 85px">
            </el-row>
          </el-col>

          <el-col style="width: 100px;">
            <el-row style="height: 200px;">
              <hr width=100 style="margin-left: 0; margin-top: 180px">
            </el-row>
          </el-col>

          <el-col style="width: 220px; height: 100%;">
            <el-row style="width: 100%">
              <el-col style="width: 60%; height: 200px; margin-top: 130px">
                <el-card class="box-card" style="width: 220px">
                  <div slot="header" class="clearfix">
                    <span>综合实训1</span>
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content">请完成以下课程的学习：<br/>嵌入式编程、计算机网络</div>
                      <el-button style="float: right; padding: 3px 0" type="text">选课</el-button>
                    </el-tooltip>
                  </div>
                  <div>
                    基于ARIMA的天气预测平台
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-popover>

    <el-tabs v-model="activeName" type="card" >
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
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">大数据概论</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200866 </p>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">软件体系结构</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200879 </p>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content">
            <img style="height: 180px; width: 280px; margin-top: 8%; margin-left: 12%; cursor:pointer;" src="../assets/default_course_img.jpg" alt="logo" @click="toCourse" >
            <el-link style="margin-top: 5%; margin-left: 12%; text-decoration-line: underline; font-weight: bold; font-size: large " @click="toCourse">软件项目管理</el-link>
            <p style="margin-top: 5%; margin-left: 12%;font-size: small"> 课程编码：M200804 </p>
          </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>

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