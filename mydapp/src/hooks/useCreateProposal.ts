// src/hooks/useCreateProposal.ts
import { useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useCreateProposal = () => {
  const { client, address } = useAragonClient();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createProposal = async ({
    title,
    summary,
    description,
    resources,
    actions,
  }: {
    title: string;
    summary?: string;
    description?: string;
    resources?: string[];
    actions: {
      to: string;
      value: bigint;
      data: `0x${string}`;
    }[];
  }) => {
    if (!client || !address) return;

    try {
      setLoading(true);
      setError(null);
      setTxHash(null);

      const proposal = await client.methods.createProposal({
        metadata: {
          title,
          summary,
          description,
          resources,
        },
        actions,
      });

      setTxHash(proposal.txHash);
    } catch (err: any) {
      console.error("제안 생성 오류:", err);
      setError(err.message || "제안 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return { createProposal, loading, txHash, error };
};
