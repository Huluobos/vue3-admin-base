<template>
  <div>
  <!-- 公共组件 -->
    <div>{{a}}</div>
    <!-- <button @click="clickFun">点击改变dom</button>   -->
    <button @click="clickFun2">点击改变dom2222</button>  
    <div class="box">{{b}}</div>
  </div>
</template>s
<script lang='ts'>
// 使用选项式注意 setup return 和 defineComponent
// import {defineComponent} from 'vue'  //这个不用引入了，统一引入了
export default defineComponent({
  data(){
    return{
      a:'选项式测试',
      // b:""
    }
  },
  setup() {
    let b = ref<string>('')
    // function clickFun(){
    //    b.value = 'dom被改变了'
    //    console.log(b)
    // }
    return {
      // clickFun,
      b
    }
  },
  methods:{
    // 响应式值只要式在 setup中声明了，其他操作函数可以挪到 methods 和其他证明周期中，不用全都写到setup中
    // 但是注意，在setup中取值或者赋值需要用到 b.value ，但在setup外面时使用的是this.b
    clickFun2(){
      console.log('clickFun')
      this.b = 'dom被改变了222222'
      console.log(this.b)
    }
  },
  mounted(){
    // 声明周期有变化。created没了  销毁变成 beforeUnmount 和 unmounted
    console.log("mounted")
  },
  
  
})

</script>
<style scoped>
  .box{
    color: #ff6700;
  }
</style>