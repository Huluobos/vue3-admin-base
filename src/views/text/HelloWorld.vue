

<template>
  <div @click="toEmit()">{{arrs}}</div>
  <table border="1"> 
    <tr>
      <th v-for="(item,index) in thData" :key="index + 's'">
        {{item.name}}
      </th>
    </tr>
    <tr v-for="(item,index) in tdData" :key="index + 'q'">
      <td>{{item.name}}</td>
      <td>
        <span @click="add(item)" class="add">+</span>
        <span class="text">{{item.num}}</span>
        
        <span @click="del(item)" class="del">-</span>

      </td>
      <td>{{item.money}}</td>
      <td>{{item.count}}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>总价</td>
      <td>{{countAll}}</td>
    </tr>
  </table>
  <!-- <button @click="stopWatch">停止监听</button> -->
  
</template>
<script setup lang="ts">
// import { ref,isRef,shallowRef,triggerRef,customRef,reactive,readonly,shallowReactive,shallowReadonly,toRef,toRefs,toRaw, } from 'vue'
// shallowRef : 响应式只到 value  改value更新，但是改下面的就不更新dom了，但是原型上的值会改变
// triggerRef : 可以强制更新数据和dom
// customRef : 自定义ref
// ref 的更新视图会顺带触发shallowRef的视图更新 ref也可以声明复杂数据类型
// reactive 响应式对象数组  
// readonly 只读的
// shallowReactive 浅层更改，深度也被改了，但是深层的不会更新dom
// toRef 使用原始对象中的某个键值对时，可以更改 原始对象的值，但是不会触发试图更新
// toRaw 响应式代理对象转成普通对象
// import { computed,watch,watchEffect} from 'vue'


// 子组件接收
// defineProps这种不能设置默认值，
// withDefaults + defineProps能设置默认值
type Props = {
  arrs?:number[],
}
// defineProps<{
//   arrs:number[],
// }>()
withDefaults(defineProps<Props>(),{
  arrs:()=>{ return [0,0]},
})
// 向父组件传值
  // const emit= defineEmits<{(e: 'emitData', str: string): void}>() //ts专有
const emit = defineEmits(['emitData'])  //不用ts
const toEmit = ()=>{
  emit('emitData','HelloWord')
}

// 购物车功能
type thClass = {
  name:string,
  value:string
}
const thData = readonly<thClass[]>([
  {name:'名称',value:'名称'},
  {name:'数量',value:'数量'},
  {name:'单价',value:'单价'},
  {name:'操作',value:'操作'},
])
type tdClass = {
  name:string,
  num:number,
  money:number,
  count:number,
}
let tdData = reactive<tdClass[]>([
  {name:'上衣',num:0,money:100,count:0},
  {name:'T恤',num:0,money:200,count:0},
  {name:'裤子',num:0,money:300,count:0},
  {name:'鞋子',num:0,money:400,count:0},
])
let countAll = ref<number>(0)
const add = (item:tdClass)=>{
  item.num++
  item.count = item.num* item.money
  countAll.value += item.money

}
const del = (item:tdClass)=>{
  item.num--
  item.count = item.num* item.money
  countAll.value -=  item.money
}
// computed 计算属性
// let countAll = computed(()=>{
//   let nums:number = 0
//   tdData.forEach(val=>{
//     nums += val.count
//   })
//   return nums>0 ? nums : 0
// })
// 监听属性
// watch监听复杂数据类型的时候，只能监听到变化 oldVal就取不到了 
// watchEffect 高级监听器，直接能取到全部的值的变化，且能停止和提前操作，并且可配置第二参数(flush:xxx)为选择在dom加载时序触发（dom更新前、中、后） 
// watch([tdData,thData],(newVal,oldVal)=>{
//   console.log(newVal)
//   console.log(oldVal)
// },{deep:true})
// watch(()=> tdData,(newVal,oldVal)=>{
//   console.log(newVal)
//   console.log(oldVal)
// },{deep:true})
// // 监听打断
// const stopWatch = watchEffect(()=>{
//   console.log(countAll.value)
// })

defineExpose({
  thData
})


</script>
<style scoped>
.text{
  padding: 0 20px;
}
.add,.del{
  cursor: pointer;
  color: #ff6700;
  font-size: 20px;
  padding: 0 20px;
}
</style>
