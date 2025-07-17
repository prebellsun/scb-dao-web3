import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// ✅ rollupNodePolyFill 임포트 및 사용을 제거합니다.
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// ✅ vite-plugin-node-polyfills 임포트
import { nodePolyfills } from 'vite-plugin-node-polyfills'; 
import mkcert from 'vite-plugin-mkcert'; 

export default defineConfig({
  plugins: [
    react(),
    mkcert(), // mkcert 플러그인
    // ✅ 여기에 nodePolyfills 플러그인을 추가합니다.
    nodePolyfills({
      // 필요한 polyfill을 활성화합니다. (현재 package.json에 buffer, process가 있으므로)
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
      },
      // esbuildOptions.plugins는 이전 단계에서 이미 제거되었습니다.
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // ✅ rollupNodePolyFill() 사용을 제거합니다.
      ],
    },
  },
  server: {
  
  proxy: {
    '/ipfs-proxy-pinata': {
      target: 'https://gateway.pinata.cloud',
      changeOrigin: true,
      rewrite: (path) => path.replace('/ipfs-proxy-pinata', ''),
      secure: true,
      followRedirects: true,
      // ✅ 이 부분이 맞는지 확인하세요.
      headers: {
        'Authorization': `Bearer ${process.env.VITE_PINATA_JWT}` 
      },
    },
    }
  }
});

