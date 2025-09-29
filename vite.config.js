import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar} from '@quasar/vite-plugin'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    script: {
      // 强制启用类型推导（即使不写 lang="ts"）
      defineModel: true,
      propsDestructure: true
    }
  }),
    quasar({
      // sassVariables: false // 自定义主题变量文件（可选）
    }),
  ],
    build: {
      target: 'chrome52', // 指定浏览器版本
      cssTarget: 'chrome52', // 指定 css 兼容浏览器版本

    }
  ,
  server: {
    // 如果需要调试原生应用中的 WebView，请设置允许跨域请求
    cors: true,
    proxy: {
      '/api': {
        target: 'http://192.168.10.28:5009',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },

  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.vue'] // 添加 .vue 扩展名
  }
})
