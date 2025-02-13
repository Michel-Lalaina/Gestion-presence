import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/// <reference types="vite/client" />

// https://vite.dev/config/

export default defineConfig({
  base: "/mon-portfolio/", // Remplace par le nom EXACT de ton dépôt GitHub
  plugins: [react()],
});
