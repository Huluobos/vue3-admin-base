declare module '@vue/runtime-core' {
  // 全局的组件声明，使用时直接写标签即可
  // 局部引入也可以 需要手动导咯
  export interface GlobalComponents {
    // BaseHeader: typeof import('./components/layouts/BaseHeader.vue')['default']
    // BaseSide: typeof import('./components/layouts/BaseSide.vue')['default']
    Card: typeof import('./components/Card/Card.vue')['default']
  }
}

export { }
