import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const repoName = 'elements';

export default defineConfig(({ mode }) => ({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    base: mode === 'production' ? `/${repoName}/` : '/',
}));
