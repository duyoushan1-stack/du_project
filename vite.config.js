/**
 * 預設頁面主入口, 可更換 root
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '0504-this',
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, '0504-this/index.html'),
    },
  },
})
