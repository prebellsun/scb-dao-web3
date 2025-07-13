import { useEffect, useState } from "react";
import { useAragonClient } from "./useAragonClient";
import { Proposal } from "@aragon/sdk-client";

export const useProposalDetail = (id?: string) => {
  const { client } = useAragonClient();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!client || !id) return;
      setLoading(true);
      try {
        const p = await client.proposal.get({ proposalId: id });
        setProposal(p);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProposal();
  }, [client, id]);

  return { proposal, loading, error };
};
