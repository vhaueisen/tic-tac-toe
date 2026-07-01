import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    base: process.env.VITE_BASE_PATH ?? "/",
    plugins: [react()],
    server: {
        host: "127.0.0.1",
        port: 3000,
        strictPort: true,
    },
    test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        globals: true,
    },
});
