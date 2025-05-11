import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' artık 'src' klasörünü işaret edecek
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../backend/app/frontend_dist',
    emptyOutDir: true,
  },
})