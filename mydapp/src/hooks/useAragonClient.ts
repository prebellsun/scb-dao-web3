// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import { getClient, environments } from "@aragon/sdk-client";
import { Address } from "viem";

const DAO_ADDRESS = "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081";

export const useAragonClient = () => {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const setupClient = async () => {
      const client = await getClient({
        daoAddress: DAO_ADDRESS as Address,
        environment: environments.aragon.zion, // Sepolia 테스트넷 포함 환경
      });
      setClient(client);
    };

    setupClient();
  }, []);

  return { client };
};



