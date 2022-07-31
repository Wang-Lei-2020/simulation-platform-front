<template>
  <div>
    <iframe id = "testMsg" style = "width: 1500px;height: 600px;" src = 'https://www.thingjs.com/pp/e7524801afe1e1271b939375' ></iframe>
  </div>
</template>

<script>
export default {
  name: "Experiment",
  created() {
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
  },
}
</script>

<style scoped>

</style>
