import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer', // 👉 buffer 사용 가능하게 설정
      stream: 'stream-browserify', // (필요 시 추가)
      process: 'process/browser',   // (필요 시 추가)
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // 👉 global 객체 브라우저 호환
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // 👉 Rollup polyfill 추가
      ],
    },
  },
});

