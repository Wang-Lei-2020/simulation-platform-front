<template>
    <div>
<!--      <iframe id = "testMsg" style = "width: 1500px;height: 600px;" src = 'https://www.thingjs.com/pp/e7524801afe1e1271b939375' ></iframe>-->
      <iframe id = "testMsg" style = "width: 1230px;height: 645px;" src = 'https://www.thingjs.com/s/776376f0de43375d608eebd2'></iframe>
    </div>
</template>

<script>
export default {
  name: "SceneView",
  created() {
    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
  },
}
</script>

<style scoped>

</style>
