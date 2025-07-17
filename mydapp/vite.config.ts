import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// ✅ 더 이상 사용하지 않으므로 rollup-plugin-node-polyfills 임포트 제거
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// ✅ 더 이상 사용하지 않으므로 @esbuild-plugins 임포트 제거
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

import mkcert from 'vite-plugin-mkcert'; // ✅ mkcert 플러그인 임포트 유지
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // ✅ 올바른 polyfill 플러그인 임포트 유지

// ✅ 이 ESLint 경고를 해당 블록에서만 무시하도록 추가합니다.
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_PINATA_JWT?: string;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export default defineConfig({
  plugins: [
    react(),
    mkcert(), // ✅ mkcert 플러그인 사용
    nodePolyfills({ // ✅ vite-plugin-node-polyfills 사용
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      // ✅ optimizeDeps.esbuildOptions.plugins는 이전 단계에서 제거되었습니다.
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // ✅ rollupNodePolyFill() 사용은 이전 단계에서 제거되었습니다.
      ],
    },
  },
  server: {
    // ✅ 가장 중요한 수정: 이 'https: true' 라인을 제거합니다.
    // https: true, 
    proxy: {
      '/ipfs-proxy-pinata': {
        target: 'https://gateway.pinata.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace('/ipfs-proxy-pinata', ''),
        secure: true,
        followRedirects: true,
        headers: {
          'Authorization': `Bearer ${process.env.VITE_PINATA_JWT}` 
        },
      },
    }
  }
});

