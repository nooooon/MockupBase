import { defineConfig } from 'vite'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: './',
  build: {
    outDir: './dist'
  },
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/sass/_variables.scss"; \
                          @import "./src/assets/sass/_mixin.scss";`
      }
    }
  }
})