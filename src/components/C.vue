

<template>
  <div>
    <div>这里是C</div>
    <!-- <div>{{a}}</div> -->
  </div>
</template>
<script setup lang="ts">
  
  setTimeout(()=>{
    let a = reactive<number[]>([0,1])
    // a.push(2,3,4)
  },2000)

</script>
<style scoped>

</style>
