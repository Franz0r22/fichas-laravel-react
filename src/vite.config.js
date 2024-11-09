import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        base:
            env.VITE_API_ENV === "production"
                ? `${env.VITE_API_URL}/build`
                : env.VITE_API_URL,
        plugins: [
            laravel({
                input: ["resources/js/app.jsx"],
                refresh: true,
            }),
            react(),
        ],
        resolve: {
            alias: {
                "@": "/resources/js",
                "@public": "/public",
                "@images": "/resources/images",
                "ziggy-js": path.resolve("vendor/tightenco/ziggy"),
            },
        },
        // server: {
        //     host: "127.0.0.1",
        //     port: 5173, // el puerto puede variar
        // },
    };
});