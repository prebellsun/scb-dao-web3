// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import { Client, Context } from "@aragon/sdk-client";
import type { ContextParams } from "@aragon/sdk-client";
import { useWalletClient, usePublicClient } from "wagmi";
import type { Address } from "viem";
import { JsonRpcSigner, ethers } from "ethers"; // BrowserProvider 제거

export const DAO_ADDRESS = "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081";
const WEB3_PROVIDER = "https://sepolia.infura.io/v3/bd252ad7084c4e2489b25fb59b213233";

export const useAragonClient = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    console.log("🔄 useAragonClient useEffect triggered.");
    console.log("🌐 publicClient:", publicClient);
    console.log("👛 walletClient:", walletClient);

    const setup = async () => {
      if (!publicClient || !walletClient) {
        console.warn("⚠️ PublicClient 또는 WalletClient가 준비되지 않음. 클라이언트 생성 생략.");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum); // 직접 지갑 사용
        const signer: JsonRpcSigner = await provider.getSigner();

        console.log("✅ signer 생성 성공:", signer);

        const params: ContextParams = {
          network: "sepolia",
          signer,
          web3Providers: [WEB3_PROVIDER],
          daoAddress: DAO_ADDRESS as Address,
        };

        const context = new Context(params);
        const aragonClient = new Client(context);
        setClient(aragonClient);
        console.log("✅ Aragon Client 생성 완료");
      } catch (err) {
        console.error("❌ Signer 또는 Client 생성 실패:", err);
      }
    };

    setup();
  }, [publicClient, walletClient]);

  return { client };
};










