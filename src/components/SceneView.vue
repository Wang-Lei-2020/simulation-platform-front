<template>
    <div>
<!--      <iframe id = "testMsg" style = "width: 1500px;height: 600px;" src = 'https://www.thingjs.com/pp/e7524801afe1e1271b939375' ></iframe>-->
<!--      <iframe id = "testMsg" style = "width: 1230px;height: 645px;" src = 'https://www.thingjs.com/pp/4cb5a2f701159d5b47e55e4f'></iframe>-->
      <img style = "margin: 10px 100px 0 0;width: 1100px;height: 620px;" src="../assets/雪山.jpg" >
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
