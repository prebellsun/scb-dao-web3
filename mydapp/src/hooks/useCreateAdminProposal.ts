// src/hooks/useCreateAdminProposal.ts
import { useState } from "react";
import { useAragonClient } from "./useAragonClient";

export const useCreateAdminProposal = () => {
  const { client } = useAragonClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const createProposal = async (title: string, summary: string) => {
    try {
      if (!client) throw new Error("Aragon client not initialized");
      setLoading(true);
      setSuccess(false);
      setError(null);

      const proposalData = {
        metadata: {
          title,
          summary,
        },
        actions: [],
      };

      await client.proposals.create(proposalData);
      setSuccess(true);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createProposal, loading, error, success };
};
