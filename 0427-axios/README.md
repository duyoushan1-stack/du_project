# 使用方法

1. 更換 vite.config.js

```js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '0427-axios',
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, '0427-axios/index.html'),
    },
  },
})
```

2. 啟動開發伺服器

```bash
npm run dev
```
