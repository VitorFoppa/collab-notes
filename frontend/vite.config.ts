import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- Alterado para o plugin padrão
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})