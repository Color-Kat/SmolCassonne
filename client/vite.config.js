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
            '@': path.resolve(__dirname, './resources/js'),
            '@sass': path.resolve(__dirname, './resources/sass/'),
            '@assets': path.resolve(__dirname, './resources/js/assets/'),
            '@pages': path.resolve(__dirname, './resources/js/pages/'),
            '@modules': path.resolve(__dirname, './resources/js/modules/'),
            '@components': path.resolve(__dirname, './resources/js/components/'),
            '@UI': path.resolve(__dirname, './resources/js/UI/'),
            '@hooks': path.resolve(__dirname, './resources/js/hooks/'),
            '@utils': path.resolve(__dirname, './resources/js/utils/')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
});