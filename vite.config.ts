import path from 'path'
import { defineConfig,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'


 //解放双手，自动导入composition api 和 生成全局typescript说明(不用手动导入了)
import Components from 'unplugin-vue-components/vite'
//使用此插件后，不需要手动编写import { Button } from 'ant-design-vue'这样的代码了，插件会自动识别template中使用的自定义组件并自动注册。
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const { resolve } = require('path')
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default ({mode})=> defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: ['src/components'], // 按需加载的文件夹 这里组件在别的页面使用并不用导入
      resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
     ] // ElementPlus按需加载
    }),
    AutoImport ({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
      dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局组件声明
    })
  ],
  
  resolve: {
    alias: {
        '~/': `${pathSrc}/`,
        '@': resolve('src'),
        '#': resolve('src/types'),
        components: resolve('src/components'),
        views: resolve('src/views'),
        assets: resolve('src/assets'),
        layout: resolve('src/layout'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/style/element/index.scss" as *;`,
      },
    },
  },
  define: {
    'process.env': loadEnv(mode, process.cwd())
  },
})
