import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/elements',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
