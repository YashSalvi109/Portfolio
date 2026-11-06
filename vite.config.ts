import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seo } from './seo.ts'

// Deployed on Vercel at the domain root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), seo()],
})
