import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    quasar({
      // sassVariables: false // 自定义主题变量文件（可选）
    }),
  ],
    build: {
      target: 'chrome52', // 指定浏览器版本
      cssTarget: 'chrome52', // 指定 css 兼容浏览器版本
    }
  ,

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.vue'] // 添加 .vue 扩展名
  }
})
