/**
 * 預設頁面主入口, 可更換 root
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'js-practice/0504-this',
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'js-practice/0504-this/index.html'),
    },
  },
})

