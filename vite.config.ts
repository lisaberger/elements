import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(() => ({
    plugins: [react(), tailwindcss()],
    base: process.env.NODE_ENV === 'production' ? '/elements/' : '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
}));
