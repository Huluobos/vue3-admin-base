<template>
  <div>
    <div>这里是公共组件演示样例</div>
    <el-card>
      {{ title?.name }}
    </el-card>
  </div>
</template>
<script setup lang="ts">
type infoType = {
  name?: string;
};
type Props = {
  title?: infoType; //?: 表示非必传
};

withDefaults(defineProps<Props>(), {
  title: () => {
    return {};
  },
});
</script>
<style scoped></style>
