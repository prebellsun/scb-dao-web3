// src/main.tsx
// 기존 코드:
// import { Buffer } from 'buffer'; // 이 줄은 이제 필요 없습니다 (이전 단계에서 제거됨)
// window.Buffer = Buffer; // 이 줄도 이제 필요 없습니다 (이전 단계에서 제거됨)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Wagmi 관련 임포트 추가
import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains'; // 사용하려는 체인 임포트
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query 임포트

// --- Wagmi 설정 시작 ---
const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

// sepolia 체인의 RPC URL
const WEB3_PROVIDER = "https://sepolia.infura.io/v3/bd252ad7084c4e2489b25fb59b213233"; // useAragonClient.ts와 동일하게 맞춰주세요.

const config = createConfig({
  chains: [sepolia], // 사용할 체인 배열 (여기서는 sepolia만)
  transports: {
    [sepolia.id]: http(WEB3_PROVIDER), // sepolia 체인에 사용할 HTTP 프로바이더 설정
  },
});
// --- Wagmi 설정 끝 ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* WagmiProvider와 QueryClientProvider로 App 컴포넌트 감싸기 */}
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

