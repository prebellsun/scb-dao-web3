// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import { Client, Context, ContextParams } from "@aragon/sdk-client";
import { useWalletClient } from "wagmi"; // ✅ 변경된 부분
import { Address } from "viem";

const DAO_ADDRESS = "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081";
const WEB3_PROVIDER = "https://rpc.sepolia.org";

export const useAragonClient = () => {
  const { data: walletClient } = useWalletClient(); // ✅ wagmi@2 방식
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const setup = async () => {
      if (!walletClient) {
        setClient(null);
        return;
      }

      const signer = await walletClient.getSigner(); // ✅ signer 생성

      const params: ContextParams = {
        network: "sepolia",
        signer,
        web3Providers: [WEB3_PROVIDER],
      };

      const context = new Context(params);
      const cli = new Client(context);
      await cli.methods.getDao(DAO_ADDRESS as Address).catch(console.error);
      setClient(cli);
    };

    setup();
  }, [walletClient]);

  return { client };
};





