import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { searchOutput } from './scripts/search-output'

export default defineConfig(({ mode }) => ({
  plugins: [vue(), searchOutput(loadEnv(mode, process.cwd()).VITE_SITE_URL)],
}))
