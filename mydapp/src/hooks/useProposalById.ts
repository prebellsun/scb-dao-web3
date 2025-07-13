// src/hooks/useProposalById.ts
import { useEffect, useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useProposalById = (proposalId: string | undefined) => {
  const { client } = useAragonClient();
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!client || !proposalId) return;
      setLoading(true);
      try {
        const data = await client.proposal.get({ proposalId });
        setProposal(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProposal();
  }, [client, proposalId]);

  return { proposal, loading, error };
};
