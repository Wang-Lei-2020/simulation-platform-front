<template>
  <el-row style="display: block;">
    <el-row class="backstyle" >
      <el-col span="18" style="min-height: 1px;">
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
                        <el-row style="margin-top: 20px;" v-for="citem in item.result" :key="citem.outcome">
                          <a @click="gotobutton(index)">
                            <el-radio v-model="item.radio" :label="citem.outanswer">{{citem.outcome}}</el-radio>
                          </a>
                        </el-row>
<!--                      </el-col>-->
                    </el-row>
                    <el-row style="margin-bottom: 20px;left:5%;border-bottom: 1px solid rgb(228,228,228);line-height: 32px;">
                      8. 实验练习：第一个天气预测项目
                      <iframe id = "testMsg" style = "margin-top:20px;width: 870px;height: 645px;" src = 'https://www.thingjs.com/s/776376f0de43375d608eebd2' ></iframe>
                    </el-row>
                    <el-row style="margin-top: 60px;text-align: center;">
                      <el-col span="12">
                        <div>
                          <div class="mask" v-if="showModal" @click="showModal=false"></div>
                          <div class="pop" v-if="showModal">
<!--                            <img src="../../assets/img/we.png" style="width: 100%;height:100%;"></img>-->
                          </div>
                          <el-button @click="showModal=true" type="primary" round>提交</el-button>
                        </div>
                      </el-col>
                      <el-col span="12">
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
      <el-col span="6">
        <el-container style="margin-right: 50px;position: fixed;">
          <el-header class="header_style" style="line-height: 40px;height: 40px;">练习</el-header>
          <el-main class="content_style">
            <el-row style="margin-top: -15px;">
              实验练习
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-button @click="Submit(index+1)" class="button_style" v-for="(item,index) in datalist" :key="index" :style="item.show">{{index+1}}</el-button>
              <el-button @click="Submit(index+1)" class="button_style">8</el-button>
<!--              实验题的跳转需要研究一下-->
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
      datalist: [{
        title: '两位同事从上海出发前往深圳出差，他们在不同时间出发，搭乘的交通工具也不同，能准确描述两者“上海到深圳”距离差别的是：',
        answer: 'D',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '欧式距离',
        }, {
          outanswer: 'B',
          outcome: '余弦距离',
        }, {
          outanswer: 'C',
          outcome: '曼哈顿距离',
        }, {
          outanswer: 'D',
          outcome: '切比雪夫距离',
        }]
      }, {
        title: '机器学习训练时，Mini-Batch 的大小优选为2个的幂，如 256 或 512。它背后的原因是什么？',
        answer: 'B',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: 'Mini-Batch 为偶数的时候，梯度下降算法训练的更快',
        }, {
          outanswer: 'B',
          outcome: 'Mini-Batch 设为2的幂，是为了符合CPU、GPU的内存要求，利于并行化处理',
        }, {
          outanswer: 'C',
          outcome: '不使用偶数时，损失函数是不稳定的',
        }, {
          outanswer: 'D',
          outcome: '以上说法都不对',
          }]

      },{
        title: '下列说法错误的是？',
        answer: 'C',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '当目标函数是凸函数时，梯度下降算法的解一般就是全局最优解',
        }, {
          outanswer: 'B',
          outcome: '进行 PCA 降维时，需要计算协方差矩阵',
        },{
          outanswer: 'C',
          outcome: '沿负梯度的方向一定是最优的方向',
        }, {
          outanswer: 'D',
          outcome: '利用拉格朗日函数能解带约束的优化问题',
        }]
      }, {
        title: '关于 L1、L2 正则化下列说法正确的是？',
        answer: 'C',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: ' L2 正则化能防止过拟合，提升模型的泛化能力，但 L1 做不到这点',
        }, {
          outanswer: 'B',
          outcome: 'L2 正则化技术又称为 Lasso Regularization',
        },{
          outanswer: 'C',
          outcome: ' L1 正则化得到的解更加稀疏',
        }, {
          outanswer: 'D',
          outcome: 'L2 正则化得到的解更加稀疏',
        }]
      },{
        title: '“增加卷积核的尺寸，一定能提高卷积神经网络的性能。” 这句话是否正确？',
        answer: 'B',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '正确',
        }, {
          outanswer: 'B',
          outcome: '错误',
        }]
      },{
        title: '有N个样本，一般用于训练，一般用于测试。若增大N值，则训练误差和测试误差之间的差距会如何变化？',
        answer: 'B',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '增大',
        }, {
          outanswer: 'B',
          outcome: '减小',
        }]
      }, {
        title: '在回归模型中，下列哪一项在权衡欠拟合（under-fitting）和过拟合（over-fitting）中影响最大？',
        answer: 'A',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '多项式阶数',
        }, {
          outanswer: 'B',
          outcome: '更新权重w时，使用的是矩阵求逆还是梯度下降',
        }, {
          outanswer: 'C',
          outcome: '使用常数项',
        }]
      }],
    };
  },
  methods: {
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

