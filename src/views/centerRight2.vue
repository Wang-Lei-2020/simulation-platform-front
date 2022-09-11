<template>
  <div id="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="align-left" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2" style="font-size: 18px">我的课程进度</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
        <centerRight2Chart1 />
      </div>
    </div>
  </div>
</template>

<script>
import centerRight2Chart1 from '@/components/echart/centerRight/centerRightChart'

export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '数据库',
            value: 100
          },
          {
            name: '数据结构',
            value: 67
          },
          {
            name: '软件测试',
            value: 60
          },
          {
            name: '网站开发',
            value: 54
          },
          {
            name: '计算机网络',
            value: 75
          }
        ]
      }
    }
  },
  components: { centerRight2Chart1 }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
@import '../assets/scss/style';
@import '../assets/scss/variables';

#centerRight2 {
  $box-height: 410px;
  $box-width: 340px;
  padding: 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-cap-chart {
      width: 100%;
      height: 160px;
    }
  }
}
</style>
