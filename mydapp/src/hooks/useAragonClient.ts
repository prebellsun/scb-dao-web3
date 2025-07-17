// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import { Client, Context } from "@aragon/sdk-client"; // Client와 Context 모두 필요
import type { ContextParams } from "@aragon/sdk-client";
import { useWalletClient, usePublicClient } from "wagmi";

// Wagmi와 ethers.js v5를 연결하기 위한 유틸리티 함수 임포트
import { publicClientToProvider, walletClientToSigner } from "../utils/ethers-wagmi-utils"; 

export const DAO_ADDRESS = "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081";

// ✅ 훅의 반환 타입을 Client에서 Context로 변경합니다.
export const useAragonClient = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [aragonContext, setAragonContext] = useState<Context | null>(null);
  // Client 객체는 이 훅 내부에서만 사용할 수 있도록 합니다.
  const [aragonClientInstance, setAragonClientInstance] = useState<Client | null>(null);

  useEffect(() => {
    const setup = async () => {
      if (!walletClient || !publicClient) {
        console.warn("지갑 또는 퍼블릭 클라이언트가 없음. 지갑 연결을 확인해주세요.");
        setAragonContext(null); // Context 초기화
        setAragonClientInstance(null); // Client 초기화
        return;
      }

      const ethersProvider = publicClientToProvider(publicClient);
      const signer = walletClientToSigner(walletClient);
      
      if (!ethersProvider || !signer) {
        console.error("❌ Ethers Provider 또는 Signer 변환 실패");
        return;
      }

      const contextParams: ContextParams = {
        network: "sepolia", 
        signer,               
        web3Providers: [ethersProvider], 
        // ✅ IPFS 노드 URL을 Vite 프록시를 통하도록 변경합니다.
        ipfsNodes: [
           //{ url: 'https://localhost:5173/ipfs-proxy-cloudflare', headers: {} },
          // { url: 'https://localhost:5173/ipfs-proxy-dweb', headers: {} },
          // { url: 'https://localhost:5173/ipfs-proxy-ipfsio', headers: {} },
          { url: 'https://localhost:5173/ipfs-proxy-pinata', headers: {} },
        ],
      };

      try {
        const context = new Context(contextParams);
        const aragonClient = new Client(context); // Client 인스턴스 생성
        
        setAragonContext(context); // ✅ Context 객체 저장
        setAragonClientInstance(aragonClient); // Client 객체도 저장 (필요한 경우 외부에서 접근 가능하도록)

        console.log("✅ Aragon Client (and Context) 생성 완료");

        // DAO 로드는 여전히 aragonClientInstance를 통해 수행할 수 있습니다.
        const dao = await aragonClient.methods.getDao(DAO_ADDRESS);
        console.log("✅ DAO 로드 완료:", dao);
      } catch (err) {
        console.error("❌ Aragon Client 또는 Context 생성 실패:", err);
      }
    };

    setup();
  }, [walletClient, publicClient]);

  // ✅ Context와 Client 인스턴스를 함께 반환하도록 변경
  return { context: aragonContext, client: aragonClientInstance };
};





























