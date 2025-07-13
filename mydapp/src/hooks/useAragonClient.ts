// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import {
  getClient,
  Environment,
  HttpTransport,
} from "@aragon/sdk-client";
import { Address } from "viem";

const DAO_ADDRESS = "0x4c6D82BF403f1fF8a4c52f6562f8A277e8204081"; // 실제 DAO 주소로 변경

export const useAragonClient = () => {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const setupClient = async () => {
      const transport = new HttpTransport("https://rpc.sepolia.org"); // Sepolia 네트워크 사용
      const client = await getClient({
        daoAddress: DAO_ADDRESS as Address,
        environment: Environment.DEVELOPMENT, // 또는 PRODUCTION
        transport,
      });
      setClient(client);
    };

    setupClient();
  }, []);

  return { client };
};
