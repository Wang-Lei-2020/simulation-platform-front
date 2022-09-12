<template>
    <div>
      <Index></Index>
    </div>
</template>

<script>
import Vue from "vue";
import Index from '../views/index'
export default {
  name: "Home",
  components:{ Index },
  computed: {
    isTeacher: function(){
      return Vue.$cookies.get('role') === "teacher";
    }
  },
}
</script>

<style scoped>
</style>
