// src/hooks/useVoteOnProposal.ts
import { useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useVoteOnProposal = () => {
  const { client } = useAragonClient();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const voteOnProposal = async (proposalId: string, vote: "yes" | "no" | "abstain") => {
    if (!client) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await client.vote(proposalId, vote);
      setSuccess(true);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { voteOnProposal, isLoading, error, success };
};
