// src/hooks/useCreateProposal.ts
import { useCallback } from "react";
import { useAragonClient } from "./useAragonClient";

export const useCreateProposal = () => {
  const { client } = useAragonClient();

  const createProposal = useCallback(async (title: string, summary: string) => {
    if (!client) return;

    await client.methods.createProposal({
      metadata: {
        title,
        summary,
      },
      actions: [],
    });
  }, [client]);

  return { createProposal };
};
