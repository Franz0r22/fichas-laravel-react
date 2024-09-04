import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
            "@public": "/public",
            'ziggy-js': path.resolve('vendor/tightenco/ziggy'),
        }
    },
    server: {
        host: '127.0.0.1',
        port: 5173, // el puerto puede variar
      },
});
