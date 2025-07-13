// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import { Client, Context, ContextParams } from "@aragon/sdk-client";
import { useWalletClient, usePublicClient } from "wagmi";
import { Address } from "viem";
import { BrowserProvider } from "ethers";

export const DAO_ADDRESS = "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081"; // 실제 DAO 주소로 변경
const WEB3_PROVIDER = "https://sepolia.infura.io/v3/bd252ad7084c4e2489b25fb59b213233"; // 실제 네트워크 RPC URL로 변경

export const useAragonClient = () => {
  const { data: publicClient } = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    console.log("useAragonClient useEffect triggered."); // ✅ 추가
    console.log("publicClient:", publicClient); // ✅ 추가
    console.log("walletClient:", walletClient); // ✅ 추가

    const setup = async () => {
      if (!publicClient || !walletClient) {
        console.log("Public or Wallet Client not ready. Skipping setup."); // ✅ 추가
        setClient(null);
        return;
      }

      console.log("Both publicClient and walletClient are ready. Proceeding with setup."); // ✅ 추가

      // ... (나머지 코드 동일)
      const provider = new BrowserProvider(publicClient.transport, publicClient.chain.id);
      let signer: Signer | undefined;
      try {
        signer = await provider.getSigner(walletClient.account.address);
        console.log("Signer created:", signer); // ✅ 추가
      } catch (e) {
        console.error("Failed to get Ethers Signer from WalletClient:", e);
        setClient(null);
        return;
      }

      const params: ContextParams = {
        network: "sepolia",
        signer,
        web3Providers: [WEB3_PROVIDER],
        daoAddress: DAO_ADDRESS as Address,
      };

      const context = new Context(params);
      const cli = new Client(context);
      setClient(cli);
      console.log("Aragon Client initialized:", cli); // ✅ 추가
    };

    setup();
  }, [publicClient, walletClient]);

  return { client };
};





