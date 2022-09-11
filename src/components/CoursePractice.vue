<template>
  <el-row style="display: block;">
    <el-row class="backstyle" >
      <el-col :span="18" style="min-height: 1px;">
        <el-container>
<!--          <el-aside width="200px">-->
<!--            <el-row style="line-height: 35px;height: 45px;margin-top: 20px;">-->
<!--&lt;!&ndash;              <img src="../../assets/img/sj1.png" style="width:25px;height:30px;margin-left:-20px;">&ndash;&gt;-->
<!--              心理能力测试卷-->
<!--            </el-row>-->
<!--            <el-row style="line-height: 35px;height: 45px;">-->
<!--&lt;!&ndash;              <img src="../../assets/img/sj2.png" style="width:25px;height:30px;margin-left:-20px;">&ndash;&gt;-->
<!--              德育能力测试卷-->
<!--            </el-row>-->
<!--            <el-row style="line-height: 35px;height: 45px;">-->
<!--&lt;!&ndash;              <img src="../../assets/img/sj3.png" style="width:25px;height:30px;margin-left:-20px;">&ndash;&gt;-->
<!--              适应能力测试卷-->
<!--            </el-row>-->
<!--          </el-aside>-->
          <el-container>
            <el-main class="content_style" style="margin-right: 15px;">
              <el-container>
                <el-header class="other_header" style="height: 40px;line-height: 40px;text-align: center; color:#5D9CEC ;">实验练习一</el-header>
                <el-main>
                  <el-row>
                    <el-row :class="`classabc${index+1}`" v-for="(item,index) in datalist" :key="index" style="margin-bottom: 20px;left:5%;">
<!--                      <el-col span="2">-->
<!--&lt;!&ndash;                        <el-button class="i_style">{{index+1}}</el-button>&ndash;&gt;-->
<!--                      </el-col>-->
<!--                      <el-col span="21">-->
                        <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 32px;">
                          {{index+1}}. {{item.title}}
                        </el-row>
<!--                        <el-row style="margin-top: 20px;" v-for="citem in item.result" :key="citem.outcome">-->
                        <el-row style="margin-top: 20px;" v-for="(citem,index) in item.result" :key="index">
                          <a @click="gotobutton(index)">
                            <el-radio v-model="item.radio" :label="citem.outanswer">{{citem.outcome}}</el-radio>
                          </a>
                        </el-row>
<!--                      </el-col>-->
                    </el-row>
                    <el-row :class="'classabc8'" style="margin-bottom: 20px;left:5%;border-bottom: 1px solid rgb(228,228,228);line-height: 32px;">
                      8. 实验练习：第一个天气预测项目
                      <iframe id = "testMsg" style = "margin-top:20px;width: 870px;height: 645px;" src = 'https://www.thingjs.com/s/776376f0de43375d608eebd2' ></iframe>
                    </el-row>
                    <el-row style="margin-top: 60px;text-align: center;">
                      <el-col :span="12">
                        <div>
<!--                          <div class="mask" v-if="showModal" @click="showModal=false"></div>-->
<!--                          <div class="pop" v-if="showModal">-->
<!--                            <img src="../assets/气温预测平台/1.png" style="width: 100%;height:100%;">-->
<!--                          </div>-->
                          <el-button @click="AfterSubmit()" type="primary" round>提交</el-button>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <el-button type="primary" round>取消</el-button>
                      </el-col>
                    </el-row>
                  </el-row>

                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </el-container>
      </el-col>
      <el-col :span="6">
        <el-container style="margin-right: 50px;position: fixed;">
          <el-header class="header_style" style="line-height: 40px;height: 40px;">练习</el-header>
          <el-main class="content_style">
            <el-row style="margin-top: -15px;">
              实验练习
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-button @click="Submit(index+1)" class="button_style" v-for="(item,index) in datalist" :key="index" :style="item.show">{{index+1}}</el-button>
              <!--              实验题的跳转-->
              <el-button @click="Submit(8)" class="button_style">8</el-button>
            </el-row>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </el-row>

</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      grades: 0,
      datalist: [],
    };
  },
  created() {
    const __this = this
    this.getExerciseList(__this,10,"练习题组一")
  },
  methods: {
    getExerciseList: function(__this,courseId,groupName){
      const _this = __this;
      this.$axios.post('/exercise/getAllExercise', {"courseId":courseId,"groupName":groupName}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        if(response.data.code === '0') {
          // 这里是处理正确的回调
          let dataset = response.data.data
          console.log("dataset",dataset)
          for(let e of dataset){
            let resultList = [{
                  outanswer: 'A',
                  outcome: e['sectionA'],
                },
                  {
                    outanswer: 'B',
                    outcome: e['sectionB'],
                  },
                ]
            if(e['sectionC'] != null && e['sectionC'] != '') {
              resultList.push({outanswer: 'C', outcome: e['sectionC']})
            }
            if(e['sectionD'] != null && e['sectionD'] != '') {
              resultList.push({outanswer: 'D', outcome: e['sectionD']})
            }
            let res = {
              title: e['exerciseName'],
              answer: e['rightAnswer'],
              radio: '',
              show: '',
              result: resultList,
              }
            _this.datalist.push(res)
          }
          console.log("datalist",_this.datalist)
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
    Submit(i) {
      var wei = "classabc" + i
      var el = document.getElementsByClassName(wei)[0];
      console.log(el.offsetTop);
      this.$nextTick(function() {
        window.scrollTo({
          "behavior": "smooth",
          "top": el.offsetTop
        });
      });
    },
    PritfGrade() {
      let a;
      for (a in this.$data.datalist) {
        if (this.$data.datalist[a].answer === this.$data.datalist[a].radio) {
          this.$data.grades = this.$data.grades + 1;
        }
      }
      alert("提交成功");
    },
    gotobutton(index) {
      this.$data.datalist[index].show = 'background: #00ABEA;';
    },
    AfterSubmit(){
      this.showModal=true
      this.$message({
        message:'提交成功',
        type:'success'
      })
      setTimeout(()=>{
        this.$router.push({name: 'UserList', params: {isReload: 'true'}});
      },500)
    }
  }
}
</script>

<style scoped>
.header_style {
  margin-top: 5px;
  border: 1px solid rgb(228, 228, 228);
  text-align: left;
  padding-left: 10px;
}

.other_header {
  background: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 200;
  color: rgb(143, 201, 211);

}

.content_style {
  border: 1px solid rgb(228, 228, 228);
  text-align: left;
  padding-left: 10px;
}

.button_style {
  margin-top: 10px;
  margin-left: 18px;
  margin-left: 10px;
  width: 60px;
  text-align: center;
}

.i_style {
  background: rgb(93, 156, 236);
  font-weight: bold;
  border-radius: 10%;
}

/deep/ .el-radio__inner {}
.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 300px;
  left: 550px;
  width: calc(100% - 1000px);
  height:calc(100% - 570px);
  z-index: 2
}
.btn {
  background-color:rgb(93, 156, 236);;
  border-radius: 4px;
  border: 1px solid blue;
  padding: 4px 12px;
}
</style>

