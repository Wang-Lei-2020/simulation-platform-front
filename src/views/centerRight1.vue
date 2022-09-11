<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2" style="font-size: 18px">最近登录的用户</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ['用户名', 'ip地址', '时间'],
        data: [
          ['王磊', '北京', "<span  class='colorGrass'>5秒前</span>"],
          ['张星宇', '北京', "<span  class='colorRed'>16秒前</span>"],
          ['小黄', '上海', "<span  class='colorGrass'>30秒前</span>"],
          ['小绿', '广西', "<span  class='colorGrass'>1分钟前</span>"],
          ['小蓝', '广东', "<span  class='colorGrass'>1分钟前</span>"],
          ['小紫', '河北', "<span  class='colorGrass'>2分钟前</span>"],
          ['小粉', '山西', "<span  class='colorGrass'>2分钟前</span>"],
          ['小明', '天津', "<span  class='colorRed'>2分钟前</span>"],
          ['小橙', '重庆', "<span  class='colorRed'>3分钟前</span>"],
          ['小白', '云南', "<span  class='colorGrass'>3分钟前</span>"]
        ],
        rowNum: 7, //表格行数
        headerHeight: 25,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        index: true,
        columnWidth: [50],
        align: ['center']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
@import '../assets/scss/style';
@import '../assets/scss/variables';

$box-height: 410px;
$box-width: 300px;
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 270px;
      height: 340px;
    }
  }
}
</style>
