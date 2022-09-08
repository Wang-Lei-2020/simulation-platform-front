<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  data () {
    return {
      drawTiming: null,
      cdata: {
        year: null,
        weekCategory: [],
        radarData: [],
        radarDataAvg: [],
        maxData: 8,
        weekMaxData: [],
        weekLineData: []
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
    this.drawTimingFn();
  },
  beforeDestroy () {
    clearInterval(this.drawTiming);
  },
  methods: {
    drawTimingFn () {
      this.setData();
      this.drawTiming = setInterval(() => {
        this.setData();
      }, 6000);
    },
    setData () {
      // 清空轮询数据
      this.cdata.weekCategory = [];
      this.cdata.weekMaxData = [];
      this.cdata.weekLineData = [];
      this.cdata.radarData = [];
      this.cdata.radarDataAvg = [];

      let dateBase = new Date();
      this.cdata.year = dateBase.getFullYear();
      // 周数据
      for (let i = 0; i < 7; i++) {
        // 日期
        let date = new Date();
        this.cdata.weekCategory.unshift([date.getMonth() + 1, date.getDate()-i].join("/"));

        // 折线图数据
        this.cdata.weekMaxData.push(this.cdata.maxData);
        let hour = (Math.random() * 6).toFixed(2);
        this.cdata.weekLineData.push(hour);

        // 雷达图数据
        // 我的指标
        let project = Math.round(Math.random() * 3);
        let efficiency = Math.random().toFixed(2);
        let times = Math.round(Math.random()*5);
        let radarDayData = [hour, project, efficiency, times];
        this.cdata.radarData.unshift(radarDayData);

        // 平均指标
        let hourAvg = (Math.random() * 6).toFixed(2);
        let projectAvg = (Math.random() * 3).toFixed(2);
        let efficiencyAvg = Math.random().toFixed(2);
        let timesAvg =(Math.random()*5).toFixed(2);
        let radarDayDataAvg = [
          hourAvg,
          projectAvg,
          efficiencyAvg,
          timesAvg
        ];
        this.cdata.radarDataAvg.unshift(radarDayDataAvg);
      }

    }
  }
};
</script>

<style lang="scss" scoped>
</style>
