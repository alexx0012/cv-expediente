import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    // Desarrollo local y publicación en GitHub Pages
    base:
      env.VITE_BASE_PATH ||
      (mode === 'production' ? '/cv-expediente/' : '/'),

    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
    },

    preview: {
      host: '127.0.0.1',
      port: 4173,
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
  }
})

