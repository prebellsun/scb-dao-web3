// src/hooks/useVoteProposal.ts
import { useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useVoteProposal = () => {
  const { client } = useAragonClient();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vote = async ({
    proposalId,
    vote,
  }: {
    proposalId: string;
    vote: "yes" | "no" | "abstain";
  }) => {
    if (!client) return;
    try {
      setLoading(true);
      setError(null);
      setTxHash(null);

      const result = await client.methods.voteOnProposal({
        proposalId,
        vote,
      });

      setTxHash(result.txHash);
    } catch (err: any) {
      console.error("투표 실패:", err);
      setError(err.message || "투표 실패");
    } finally {
      setLoading(false);
    }
  };

  return { vote, loading, txHash, error };
};
