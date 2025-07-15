// src/hooks/useAragonClient.ts

import { useEffect, useState } from "react";
import { Client, Context } from "@aragon/sdk-client";
import type { ContextParams } from "@aragon/sdk-client";
import { useWalletClient, usePublicClient } from "wagmi";
import type { Address } from "viem";
// ✅ ethers v5 임포트 방식:
// JsonRpcSigner는 @ethersproject/abstract-signer에서 가져옵니다.
import { JsonRpcSigner } from "@ethersproject/abstract-signer";
// Web3Provider와 JsonRpcProvider는 @ethersproject/providers에서 직접 가져옵니다.
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
// ethers 객체 자체는 다른 유틸리티를 위해 필요할 수 있으므로 유지합니다.
import { ethers } from "ethers";

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
        // ✅ ethers v5 방식: Web3Provider를 직접 사용
        const provider = new Web3Provider(window.ethereum);
        const signer: JsonRpcSigner = provider.getSigner();

        console.log("✅ signer 생성 성공:", signer);

        // ✅ ethers v5 방식: JsonRpcProvider를 직접 사용
        const rpcProvider = new JsonRpcProvider(WEB3_PROVIDER);

        const params: ContextParams = {
          network: "sepolia",
          signer,
          web3Providers: [rpcProvider],
          ipfsNodes: [
            {
              url: 'https://cloudflare-ipfs.com',
              headers: {},
            },
            {
              url: 'https://dweb.link',
              headers: {},
            },
            {
              url: 'https://gateway.ipfs.io',
              headers: {},
            },
            {
              url: 'https://gateway.pinata.cloud',
              headers: {},
            },
          ],
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
























