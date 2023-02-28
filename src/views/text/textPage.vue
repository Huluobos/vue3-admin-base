<template>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
    
  <!-- 公共组件 -->
    <Card :title="{name:'公共组件标题'}"></Card>
    <!--动态组件  -->
    <button :key="index" v-for="(item,index) in tabData" @click="changeComponentId(item)">{{item.name}}</button>
    <component :is="componentId.col"></component>

    <!-- 插槽和2.0一样的 -->
    <A>
      <template #aa="{arrslot}">aa{{arrslot}}</template>
      <template #dd>dd</template>
    </A>
    <!-- 异步组件 -->
    <Suspense>
      <template #default>
        <C></C> 
      </template>
      <template #fallback>
        <div>loading....</div>
      </template>
    </Suspense>
     

    <h1 @click="helloClick">{{a}}</h1>
    <h2>{{arrs}}</h2>
    <h2>{{emitText}}</h2>
    <HelloWorld :arrs="arrs" @emitData="emitData" ref="childExp"></HelloWorld> 
  </div>
</template>s
<script setup lang='ts'>
import A from '../../components/A.vue';
import B from '../../components/B.vue';
import { type } from 'os';
import HelloWorld from './HelloWorld.vue'

import { useUserStoreWithOut } from '@/store/modules/user'

let a = ref<string>('')
let arrs = reactive<number[]>([0,0,0,0])

// let C = defineAsyncComponent(()=> import('../../components/C.vue'))
// 异步组件 针对需要加载数据以后再加载组件的情况 使用Suspense这个标签
const time = (t:number, callback = () => {}) => {
  return new Promise<void>( (resolve) => {
    setTimeout(() => {
      callback()
      resolve()
    }, t)
  })
}
const C = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    ;(async function () {
      try {
        await time(2000)
        const res:any = await import('../../components/C.vue')
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })()
  })
})


// 声明周期
// onBeforeMount
// onMounted
// onBeforeUpdate
// onUpdated
// onActivated
// onBeforeUnmount
// onUnmounted

onBeforeMount(()=>{
  a.value = 'Huluobos'
})
onMounted(()=>{
  arrs = [9,3,4,5] //改变长度你能够监听到
  const userStore = useUserStoreWithOut()
  console.log(userStore)
  userStore.login({
    username:'',password:''
    }).then(res=>{
      console.log(res)

    }).catch(err=>{
      console.log(err)
    })
})  
const emitText = ref<string>('')
const emitData = (data:any)=>{
  // console.log(data)
  emitText.value=data
}
// 获取子组件暴露值  ref="childExp"
const childExp = ref<any>(null)
const helloClick = () => {
  // console.log(childExp.value.thData) // 123456
}

type Tab= {
  name:string,
  col:any
}
type Comp = Pick<Tab, 'col'> // Pick 从中Tab挑选一个类型
const tabData = reactive<Tab[]>([
  {name:"切换到A",col:markRaw(A)},
  {name:"切换到B",col:markRaw(B)}
])

// markRaw 跳过proxy 代理，这样就不报错了
let componentId = reactive<Comp>({col:markRaw(A)})
let changeComponentId = (item:Tab)=>{
  componentId.col = item.col
}



  //  userStore.getToken 或  userStore.getToken()
</script>