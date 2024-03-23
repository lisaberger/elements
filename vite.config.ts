import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), glsl()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
