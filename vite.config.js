import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            // User Service
            "/users": {
                target: "http://localhost:8081",
                changeOrigin: true,
                secure: false,
            },
            "/workouts": {
                target: "http://localhost:8083",
                changeOrigin: true,
                secure: false,
            },
            "/diet":{
                target: "http://localhost:8082",
                changeOrigin: true,
                secure: false,
            }
        },
    },
})
