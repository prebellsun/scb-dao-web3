// src/hooks/useAragonClient.ts
import { useMemo } from "react";
import { Client } from "@aragon/sdk-client";
import { useAccount, useSigner } from "wagmi";

// ✅ 이 훅은 메타마스크 지갑의 signer가 연결된 경우에만 Aragon 클라이언트를 초기화함
export const useAragonClient = () => {
  const { data: signer } = useSigner();      // 현재 연결된 wallet의 signer
  const { address } = useAccount();          // 현재 wallet address

  // ✅ signer가 준비되었을 때만 Client 생성 (React 성능 최적화)
  const client = useMemo(() => {
    if (!signer) return null;

    return new Client({
      network: "sepolia",     // 테스트넷 환경 설정
      signer,                 // 지갑 signer 연결
    });
  }, [signer]);

  return { client, address };
};

// 사용 예:
// const { client, address } = useAragonClient();
// client?.methods.proposals().then(...) 이런 식으로 사용 가능
