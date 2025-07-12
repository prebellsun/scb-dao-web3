// src/hooks/useProposals.ts
import { useEffect, useState } from "react";
import { useAragonClient } from "./useAragonClient";

export interface Proposal {
  id: string;
  metadata: {
    title: string;
    summary?: string;
    description?: string;
  };
  state: string;
  createdAt: string;
}

export const useProposals = () => {
  const { client } = useAragonClient();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      if (!client) return;
      setLoading(true);
      try {
        const result = await client.methods.getProposals();
        setProposals(result.items);
      } catch (err: any) {
        setError(err.message || "제안 목록을 불러오는 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [client]);

  return { proposals, loading, error };
};
