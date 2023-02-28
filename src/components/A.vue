

<template>
  <div>
    <div>这里是A</div>
    <el-card>
      <slot name="aa" :arrslot="arrs"></slot>
      <slot name="dd"></slot>
    </el-card>
    
  </div>
</template>
<script setup lang="ts">
type infoType = {
  name?:string
}
type Props={
  title?:infoType  //?: 表示非必传
}

withDefaults(defineProps<Props>(),{
  title:()=>{ return {}},
})
let arrs = reactive<number[]>([1,2,3,4])

</script>
<style scoped>

</style>
