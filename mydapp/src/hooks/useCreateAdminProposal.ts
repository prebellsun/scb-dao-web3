// src/hooks/useCreateAdminProposal.ts
import { useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useCreateAdminProposal = () => {
  const { client, address } = useAragonClient();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createAdminProposal = async ({
    title,
    description,
    actions,
  }: {
    title: string;
    description?: string;
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
          summary: "Admin proposal",
          description,
        },
        actions,
      });

      setTxHash(proposal.txHash);
    } catch (err: any) {
      console.error("관리자 제안 오류:", err);
      setError(err.message || "제안 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return { createAdminProposal, loading, txHash, error };
};
