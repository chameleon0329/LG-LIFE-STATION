import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  server: {
    host: '0.0.0.0', // 로컬 네트워크 아이피에서도 접근 가능
    port: 5173, // 원하는 포트 번호 (기본값: 5173)
    cors: true, // CORS 허용
  },
})
