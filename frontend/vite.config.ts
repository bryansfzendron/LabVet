import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5178,
    https: false, // Garantir que não use HTTPS
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'labvet.bryanzendron.com.br',
      'linklabvet.bryanzendron.com.br'
    ],
    cors: {
      origin: [
        'http://localhost:5178',
        'http://127.0.0.1:5178',
        'http://labvet.bryanzendron.com.br',
        'https://labvet.bryanzendron.com.br',
      ],
      credentials: true
    },
    hmr: {
      port: 5178,
      host: 'localhost',
      protocol: 'ws' // Forçar WebSocket sem SSL
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5178,
    https: false, // Garantir que não use HTTPS
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'labvet.bryanzendron.com.br',
      'linklabvet.bryanzendron.com.br'
    ],
    cors: {
      origin: [
        'http://localhost:5178',
        'http://127.0.0.1:5178',
        'http://labvet.bryanzendron.com.br',
        'https://labvet.bryanzendron.com.br',
        'http://linklabvet.bryanzendron.com.br',
        'https://linklabvet.bryanzendron.com.br'
      ],
      credentials: true
    }
  }
})