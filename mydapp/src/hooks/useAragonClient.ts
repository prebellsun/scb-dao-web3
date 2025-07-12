// src/hooks/useAragonClient.ts
import { useEffect, useState } from "react";
import { Client } from "@aragon/sdk-client";
import { getWalletClient } from "@wagmi/core";
import { sepolia } from "viem/chains";
import { createPublicClient, http } from "viem";

export const useAragonClient = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const walletClient = await getWalletClient();
        if (!walletClient) throw new Error("No wallet client found");

        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        const aragonClient = new Client({
          network: sepolia,
          signer: walletClient,
          publicClient,
        });

        setClient(aragonClient);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { client, loading, error };
};