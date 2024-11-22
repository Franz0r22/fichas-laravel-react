import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        base:
            env.VITE_APP_ENV === "production"
                ? `${env.VITE_APP_URL}/build`
                : env.VITE_APP_URL,
        plugins: [
            laravel({
                input: ["resources/js/app.jsx"],
                refresh: true,
            }),
            react(),
        ],
        resolve: {
            alias: {
                "@": path.resolve("resources/js"),
                "@public": path.resolve("public"),
                "@images": path.resolve("resources/images"),
                "ziggy-js": path.resolve("vendor/tightenco/ziggy"),
            },
        },
    };
});