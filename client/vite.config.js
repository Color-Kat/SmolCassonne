import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from "path";

export default defineConfig({
    plugins: [
        // laravel({
        //     input: [
        //         'resources/js/index.tsx',
        //     ],
        //     refresh: true,
        // }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@scss': path.resolve(__dirname, './src/scss/'),
            '@assets': path.resolve(__dirname, './src/assets/'),
            '@pages': path.resolve(__dirname, './src/pages/'),
            '@modules': path.resolve(__dirname, './src/modules/'),
            '@components': path.resolve(__dirname, './src/components/'),
            '@UI': path.resolve(__dirname, './src/UI/'),
            '@hooks': path.resolve(__dirname, './src/hooks/'),
            '@utils': path.resolve(__dirname, './src/utils/')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
    // server: {
    //     port: 3000
    // }
});