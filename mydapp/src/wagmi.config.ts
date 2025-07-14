import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

// 환경 변수에서 Web3 Provider URL을 가져옵니다.
// 프로젝트의 빌드 도구 (Vite, Create React App 등)에 따라 적절한 방식으로 사용하세요.
// 예: Vite -> import.meta.env.VITE_WEB3_PROVIDER
// 예: Create React App -> process.env.REACT_APP_WEB3_PROVIDER
const WEB3_PROVIDER = process.env.REACT_APP_WEB3_PROVIDER || "https://sepolia.infura.io/v3/bd252ad7084c4e2489b25fb59b213233";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(WEB3_PROVIDER),
  },
});



