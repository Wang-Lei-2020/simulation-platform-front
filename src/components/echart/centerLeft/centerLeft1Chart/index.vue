<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: {
        xData: ["全景浏览", "基础知识", "仿真实验", "网站开发", "实验练习", "实验考核"],
        seriesData: [
          { value: 10, name: "全景浏览" },
          { value: 20, name: "基础知识" },
          { value: 15, name: "仿真实验" },
          { value: 20, name: "网站开发" },
          { value: 20, name: "实验练习" },
          { value: 12, name: "实验考核" }
        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
