import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from "nprogress" // progress bar
import 'nprogress/css/nprogress.css' // 进度条样式


import Layout from '../layout/index.vue'

//全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})
const routes: Array<RouteRecordRaw> = [
	{
		path: '/test',
		name: 'test',
		// component: Layout,
    component: () => import('views/text/textPage.vue'),
	},
  {
		path: '/test2',
		name: 'test2',
		// component: Layout,
    component: () => import('views/text/textPage2.vue'),
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})
// 路由白名单
const whiteList = ["/login"];
// 前置导航
router.beforeEach((to, from, next) => {
  
	NProgress.start() // start progress bar
  next();
  // const token = sessionStorage.getItem("token");
  // if (token) {
  //   // console.log(token)
  //   next();
  // }else{
  //   if (to.path !== "/login") {
  //     if (whiteList.indexOf(to.path) !== -1) {
  //       next();
  //     } else {
  //       next({ path: "/login" });
  //     }
  //   } else {
  //     next();
  //   }
  // }
})
// 后置守卫
router.afterEach(() => {
	NProgress.done() // finish progress bar
})

export default router
