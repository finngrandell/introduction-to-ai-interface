import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: '/introduction-to-ai-interface/',
  plugins: [UnoCSS(), react()],
})
