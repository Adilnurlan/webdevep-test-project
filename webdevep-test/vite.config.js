import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  //  server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://test.dev-webdevep.ru',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/auth-back/api/v2')
  //     }
  //   }
  // },
  server: {
    port: 8080
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
