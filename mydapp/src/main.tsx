// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Wagmi + React Query 관련 설정
import { createConfig, http, WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ React Query 클라이언트 생성
const queryClient = new QueryClient();

// ✅ Wagmi Config 설정
const WEB3_PROVIDER = "https://sepolia.infura.io/v3/bd252ad7084c4e2489b25fb59b213233";

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(WEB3_PROVIDER),
  },
});

// ✅ ReactDOM 렌더링
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);


