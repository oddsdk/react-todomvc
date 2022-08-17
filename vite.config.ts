import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  build: {
    target: 'es2020'
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        "global": "globalThis",
        "globalThis.process.env.NODE_ENV": "production",
      },
      target: "es2020"
    }
  },
  plugins: [reactRefresh()],
})